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