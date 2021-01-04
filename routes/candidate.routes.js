const router = require('express').Router();
const axios = require('axios');

const Candidate = require('../models/candidate.model');


var awsData;
//@route    GET /candidate/tests
//@desc     Test route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: "Profiles WOrks" }));

//@route    GET /candidate/all_candidates
//@desc     get all candidate
//@access   Public
router.get('/all_candidates', (req, res) => {
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json')
        .then((candidates) => {
            let data = candidates.data;
            let candidateCount = data.length;
            let newData = [];
            awsData = newData;
            const dataPromise = new Promise((resolve, reject) => {
                data.map((data, index) => {
                    let candidateObj = {};
                    candidate = data;
                    Candidate.findOne({ id: data.id })
                        .then(candidate => {
                            if (candidate) {
                                newData.push(candidate)
                                if (index + 1 >= candidateCount) {
                                    resolve();
                                }
                            } else {
                                newData.push(data)
                                if (index + 1 >= candidateCount) {
                                    resolve();
                                }
                            }
                        })
                })
            })
            dataPromise.then((err, data) => {
                res.status(200).json(newData);
            })
        })
})

//@route    GET /candidate/get_candidate/:can_id
//@desc     get  candidate
//@access   Public
router.get('/get_candidate/:can_id', (req, res) => {
    const can_id = req.params.can_id;
    Candidate.findOne({ id: can_id })
        .then(candidate => {
            if (!candidate) {
                awsData.forEach(el => {
                    if (el.id === can_id) {
                        res.status(200).json(el);
                    }
                })
            } else {
                res.status(200).json(candidate);
            }
        })
})

//@route    POST /candidate/selection
//@desc     post all candidate
//@access   Public
router.post('/selection', (req, res) => {
    const m_id = req.body.id;

    Candidate.findOne({ id: req.body.id }).then(candidate => {
        if (candidate) {
            Candidate.findOneAndUpdate({ id: req.body.id }, {
                $set: { isSelected: req.body.isSelected }
            }, { new: true }, (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(doc)
                }
            })
        } else {
            const newCandidate = new Candidate({
                id: req.body.id,
                name: req.body.name,
                Image: req.body.Image,
                isSelected: req.body.isSelected
            })

            newCandidate.save().then(candidate => res.status(200).json(candidate))
        }
    })
})

module.exports = router;