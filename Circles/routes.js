import * as dao from "./dao.js";

export default function CircleRoutes(app) {
    const fetchAllCircles = async (req, res) => {
        const circles = await dao.fetchAllCircles();
        res.json(circles);
    }
    app.get("/api/circles", fetchAllCircles);

    const fetchAllPublicCircles = async (req, res) => {
        const circles = await dao.fetchAllPublicCircles();
        res.json(circles);
    }
    app.get("/api/circles/public", fetchAllPublicCircles);

    const findCircleForId = async (req, res) => {
        const circle = await dao.findCircleForId(req.params.circleId);
        res.json(circle);
    }
    app.get("/api/circles/:circleId", findCircleForId);

    const findCirclesForMember = async (req, res) => {
        const circles = await dao.findCirclesForMember(req.params.userId);
        res.json(circles);
    }
    app.get("/api/circles/member/:userId", findCirclesForMember);

    const findCirclesForModerator = async (req, res) => {
        const circles = await dao.findCirclesForModerator(req.params.moderatorId);
        res.json(circles);
    }
    app.get("/api/circles/moderator/:moderatorId", findCirclesForModerator);

    const findModeratorsForCircle = async (req, res) => {
        const moderators = await dao.findModeratorsForCircle(req.params.circleId);
        res.json(moderators);
    }
    app.get("/api/circles/:circleId/moderators", findModeratorsForCircle);

    const joinCircle = async (req, res) => {
        const status = await dao.joinCircle(req.params.circleId, req.params.userId);
        res.json(status);
    }
    app.put("/api/circles/:circleId/join/:userId", joinCircle);

    const leaveCircle = async (req, res) => {
        const status = await dao.leaveCircle(req.params.circleId, req.params.userId);
        res.json(status);
    }
    app.put("/api/circles/:circleId/leave/:userId", leaveCircle);
}
// We very likely need a function to fetch circles by partial title
// See profiles for example