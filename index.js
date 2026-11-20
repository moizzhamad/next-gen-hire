try {
    if (typeof process.loadEnvFile === 'function') {
        process.loadEnvFile();
    } else {
        require('dotenv').config();
    }
} catch (e) {
    // .env is optional when env variables are provided by the hosting environment
}

const express = require('express');
const cors = require('cors');
require('./db/Config');

const User = require('./db/User');
const CompanyPdetails = require('./db/CompanyInfo');
const JobSpecification = require('./db/JobSpecification');
const CompanyCandidates = require('./db/AddCompanyCandidate');
const CandidateReview = require('./db/CandidateReview');
const CandidateInfodb = require('./db/CandidteInfodb');

const app = express();

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/', (req, resp) => {
    resp.json({ status: "ok", message: "NextGen-Hire Backend API is running." });
});

// Take personal info of the company
app.post('/company-info', async (req, resp) => {
    try {
        let compnaypdetails = new CompanyPdetails(req.body);
        let result = await compnaypdetails.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Intake job specification of the company
app.post('/add-jobspecification', async (req, resp) => {
    try {
        let jobspecify = new JobSpecification(req.body);
        let result = await jobspecify.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Intake company candidate details
app.post('/add-companycandiadte', async (req, resp) => {
    try {
        let companycandidates = new CompanyCandidates(req.body);
        let result = await companycandidates.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Intake information about senior developers
app.post('/add-seniorInfo', async (req, resp) => {
    try {
        let candidateinfo = new CandidateInfodb(req.body);
        let result = await candidateinfo.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Show freshers data to senior developers
app.get('/freshers', async (req, resp) => {
    try {
        let companycandidates = await CompanyCandidates.find();
        if (companycandidates.length > 0) {
            resp.send(companycandidates);
        } else {
            resp.send({ candidates: "No candidates found" });
        }
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Submit review from interviewers for freshers
app.post('/add-review', async (req, resp) => {
    try {
        let candireview = new CandidateReview(req.body);
        let result = await candireview.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Show all reviews provided by interviewers
app.get('/overview', async (req, resp) => {
    try {
        let candidatereview = await CandidateReview.find();
        if (candidatereview.length > 0) {
            resp.send(candidatereview);
        } else {
            resp.send({ candidate: "No reviews found" });
        }
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Filtering candidate by Domain
app.get("/search/:key", async (req, resp) => {
    try {
        let result = await CompanyCandidates.find({
            "$or": [
                { applicantDomain: { $regex: req.params.key, $options: "i" } }
            ]
        });
        resp.send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Filtering past candidate reviews by domain
app.get("/searchs/:key", async (req, resp) => {
    try {
        let result = await CandidateReview.find({
            "$or": [
                { domain: { $regex: req.params.key, $options: "i" } }
            ]
        });
        resp.send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// Get all senior interviewer details
app.get('/candidateDetails', async (req, resp) => {
    try {
        let candidateinfo = await CandidateInfodb.find();
        if (candidateinfo.length > 0) {
            resp.send(candidateinfo);
        } else {
            resp.send({ candidate: "No candidate found" });
        }
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// User signup
app.post("/register", async (req, resp) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        resp.status(201).send(result);
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

// User login
app.post("/login", async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                resp.send(user);
            } else {
                resp.send({ result: "No User Found" });
            }
        } else {
            resp.send({ result: "Please provide both email and password" });
        }
    } catch (err) {
        resp.status(500).send({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`NextGen-Hire Server is running on port ${PORT}`);
});
