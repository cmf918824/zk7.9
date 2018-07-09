"use strict";

$.ajax({
    url: '/api/list',
    success: function success(data) {
        console.log(data);
    }
});