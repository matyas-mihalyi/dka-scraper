require('dotenv').config()
import * as pg from 'pg';

module.exports = new pg.Pool();