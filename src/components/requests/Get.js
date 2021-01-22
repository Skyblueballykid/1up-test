/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint no-script-url: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function getRequest(value) {
    axios.get(value, {timeout: 10000}
    )
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}