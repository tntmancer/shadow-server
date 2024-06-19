//   // extend for posts and circles?
//   export const findProfilesByPartialName = async (name: string) => {
//     const response = await axios.get(`${PROFILES_API}?name=${name}`);
//     return response.data;
//   };
  
import * as dao from "./dao.js";

export default function ProfileRoutes(app) {
    const findAllProfiles = async (req, res) => {
        const profiles = await dao.findAllProfiles();
        res.json(profiles);
    };
    app.get("/api/profiles", findAllProfiles);

    // const findProfileByUsername = async (req, res) => {
    //     const profile = await dao.findProfileByUsername(req.params.username);
    //     res.json(profile);
    // };

    const signup = async (req, res) => {
        console.log(req.body);
        const profile = await dao.findProfileByUsername(req.body.username);
        if (profile) {
          res.status(400).json({ message: "Username already taken" });
          return;
        }
        const currentProfile = await dao.createProfile(req.body);
        req.session["currentProfile"] = currentProfile;
        res.json(currentProfile);
    };
    app.post("/api/signup", signup);

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentProfile = await dao.findProfileByCredentials(username, password);
        if (currentProfile) {
          req.session["currentProfile"] = currentProfile;
          res.json(currentProfile);
        } else {
          res.status(401).json({ message: "Unable to login. Try again later." });
        }
    };
    app.post("/api/signin", signin);

    const anonymous = async (req, res) => {
        // console.log(req.body);
        const currentProfile = await dao.findProfileById("66724d3398b1ba4f226dd9bc");
        req.session["currentProfile"] = currentProfile;
        res.json(currentProfile);
        console.log(req.session["currentProfile"]);
    };
    app.post("/api/anonymous", anonymous);

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/signout", signout);

    const profile = (req, res) => {
        const currentProfile = req.session["currentProfile"];
        if (!currentProfile) {
          res.sendStatus(401);
          return;
        }
        res.json(currentProfile);
    };
    app.post("/api/profile", profile);
    
    const findProfileById = async (req, res) => {
        const profile = await dao.findProfileById(req.params.profileId);
        res.json(profile);
    };
    app.get("/api/profiles/:profileId", findProfileById);
    
    // IDK if this is correct
    const findProfilesByRole = async (req, res) => {
        const role = req.params.role;
        const profiles = await dao.findProfilesByRole(role);
        res.json(profiles);
    }
    app.get("/api/profiles/?role=${role}", findProfilesByRole);
    
    const createProfile = async (req, res) => {
        const newProfile = req.body;
        const profile = await dao.createProfile(newProfile);
        res.json(profile);
    };
    app.post("/api/profiles", createProfile);
    
    const updateProfile = async (req, res) => {
        const profile = req.body;
        const status = await dao.updateProfile(req.params.profileId, profile);
        res.json(status);
    };
    app.put("/api/profiles/:profileId", updateProfile);
    
    const deleteProfile = async (req, res) => {
        const status = await dao.deleteProfile(req.params.profileId);
        res.json(status);
    };
    app.delete("/api/profiles/:profileId", deleteProfile);
}