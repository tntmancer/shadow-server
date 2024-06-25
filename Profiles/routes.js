//   // extend for posts and circles?
//   export const findProfilesByPartialName = async (name: string) => {
//     const response = await axios.get(`${PROFILES_API}?name=${name}`);
//     return response.data;
//   };
  
import * as dao from "./dao.js";
export const PROFILES_API = "/api/profiles";

export default function ProfileRoutes(app) {
    // General CRUD Operations
    const createProfile = async (req, res) => {
        const newProfile = req.body;
        const profile = await dao.createProfile(newProfile);
        res.json(profile);
    };
    app.post(PROFILES_API, createProfile);

    const findAllProfiles = async (req, res) => {
        const {role, name, ids, partialName} = req.query;
        if (role) {
            const profiles = await dao.findProfilesByRole(role);
            res.json(profiles);
            return;
        }
        if (name) {
            const profiles = await dao.findProfileByUsername(name);
            res.json(profiles);
            return;
        }
        if (ids) {
            const profiles = []
            for (let i = 0; i < ids.length; i++) {
                await dao.findProfileById(ids[i]).then(
                    (profile) => profiles.push(profile));
            }
            res.json(profiles);
            return;
        }
        if (partialName) {
            const profiles = await dao.findProfilesByPartialName(partialName);
            res.json(profiles);
            return;
        }


        const profiles = await dao.findAllProfiles();
        res.json(profiles);
    };
    app.get(PROFILES_API, findAllProfiles);

    const findProfileById = async (req, res) => {
        const id = req.params.profileId;
        if (id.length !== 24) {
            res.status(401).json({message: "Invalid profile ID format"});
            return;
        }

        const profile
            = await dao.findProfileById(req.params.profileId);
        if (!profile) {
            res.status(401).json({message: "User not found."});
            return;
        }
        res.json(profile);
    };
    app.get(`${PROFILES_API}/:profileId`, findProfileById);

    const updateProfile = async (req, res) => {
        const {profileId} = req.params;
        const status
            = await dao.updateProfile(profileId, req.body);
        res.json(status);
    };
    app.put(`${PROFILES_API}/:profileId`, updateProfile);

    const deleteProfile = async (req, res) => {
        const status = await dao.deleteProfile(req.params.profileId);
        res.json(status);
    };
    app.delete(`${PROFILES_API}/:profileId`, deleteProfile);


    // Account Authentication Management
    const signin = async (req, res) => {
        const { username, password } = req.body;
        // console.log(username, password);
        const currentProfile
            = await dao.findProfileByCredentials(username, password);
        if (currentProfile) {
            req.session["currentProfile"] = currentProfile;
            res.json(currentProfile);
        } else {
            res.status(401).json({message: "Invalid credentials."});
        }
    };
    app.post(`${PROFILES_API}/signin`, signin);

    const anonymous = async (req, res) => {
        // console.log(req.body);
        // const currentProfile = await dao.findProfileById("66724d3398b1ba4f226dd9bc");
        req.session["currentProfile"] = null;
        res.send(req.session["currentProfile"]);
    };
    app.post(`${PROFILES_API}/anonymous`, anonymous);

    const signup = async (req, res) => {
        const profile = await dao.findProfileByUsername(req.body.username);
        if (profile) {
          res.status(400).json({ message: "Username already taken" });
          return;
        }
        const currentProfile = await dao.createProfile(req.body);
        req.session["currentProfile"] = currentProfile;
        res.json(currentProfile);
    };
    app.post(`${PROFILES_API}/signup`, signup);

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post(`${PROFILES_API}/signout`, signout);

    const profile = (req, res) => {
        const currentProfile = req.session["currentProfile"];
        if (currentProfile === null) {
          // res.sendStatus(401);
          res.send(null);
          return;
        }

        res.json(currentProfile);
    };
    app.post(`${PROFILES_API}/profile`, profile);
}