const mongoose = require('mongoose')
const { Group } = require('../models/groups.model')

exports.create_group = async function (req, res) {
    const userId = res.locals.userid
    const groupName = req.body.group_name
    const group = await Group.findOne({ name: groupName }).exec()
    if (!groupName) {
        res.status(422).json({ message: 'Missing group name parameter' })
    } else if (group) {
        res.status(500).json({ message: 'Group already exists' })
    } else {
        await Group.create({
            name: groupName,
            Members: { ref: userId, role: 'admin' },
        })
        res.status(200).json({
            message: 'Group created successfully',
        })
    }
}

exports.get_group = async function (req, res) {
    const userId = res.locals.userid
    const groupId = req.params.group_id
    let group
    try {
        group = await Group.findById(groupId).lean().exec()
    } catch (err) {
        return res.status(500).json({ message: 'Invalid group ID' })
    }
    if (!groupId) {
        res.status(422).json({ message: 'Missing group parameter' })
    } else if (!group) {
        res.status(404).json({ message: 'Group not found' })
    } else {
        const number = await Group.find({
            _id: groupId,
            Members: {
                $elemMatch: { ref: userId },
            },
        }).exec()
        if (number.length > 0) {
            const memberRole = await Group.aggregate([
                {
                    $match: { _id: { $eq: mongoose.Types.ObjectId(groupId) } },
                },
                {
                    $unwind: '$Members',
                },
                {
                    $match: {
                        'Members.ref': { $eq: mongoose.Types.ObjectId(userId) },
                    },
                },
                {
                    $project: {
                        ref: '$Members.ref',
                        role: '$Members.role',
                    },
                },
            ]).exec()
            delete group.Members
            group.role = memberRole[0].role
        }
        res.status(200).json(group)
    }
}