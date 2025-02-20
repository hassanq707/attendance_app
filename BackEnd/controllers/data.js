const USER = require("../models/users");
const USER_DATA = require("../models/data");

async function handleAttendance(req, res) {

    const { today, _id } = req.body;

    const date = new Date(today);

    const attendanceData = await USER_DATA.findOne({ user: _id });

    const existingAttendance = attendanceData.attendance.find(
        (entry) => entry.date.toISOString().split("T")[0] === today
    );

    if (existingAttendance) return res.json({ message: "Attendance for today is already marked." });

    const updatedAttendance = await USER_DATA.findOneAndUpdate(
        { user: _id },
        { $push: { attendance: { date } } },
        { new: true, projection: { "attendance": { $slice: -1 } } }
    );


    return res.json(updatedAttendance.attendance[0]);
}

async function handleLeave(req, res) {
    const { date, reason } = req.body;
    const newDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newDate <= today) {
        return res.status(400).json({ message: "Leave date must be greater than today's date." });
    }

    const updatedLeaves = await USER_DATA.findOneAndUpdate(
        { user: req.user._id },
        {
            $push: { leaves: { date: newDate, reason, status: "pending" } }
        },
        {
            new: true,
            projection: { "leaves": { $slice: -1 } }
        }
    );

    return res.json(updatedLeaves.leaves[0]);
}

async function handleMarkAttendance(req, res) {

    const { _id, btn, property } = req.body;

    const updatedUser = await USER_DATA.findOneAndUpdate(
        { [`${property}._id`]: _id },
        { $set: { [`${property}.$.status`]: btn } },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: `${property} record not found` });
    }

    res.status(200).json({ message: `${property} updated successfully`, updatedUser })
}



module.exports = {
    handleAttendance,
    handleLeave,
    handleMarkAttendance
}