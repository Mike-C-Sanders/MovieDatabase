const express = require('express');
const { append } = require('express/lib/response');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: false}));