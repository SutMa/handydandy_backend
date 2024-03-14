"use strict";
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.uri;
mongoose.connect(uri);
