import { useState } from "react";
import { axiosClient } from "../../lib/axiosClient";

import { CategoryType } from "../../types/category";
import

import { setCatego }

//---



//---

export const fetchCategories = async() => {
    await axiosClient.get('/categories')
    .then(res => {
        setCategories(res.data.categories);
        setTotalItems(res.data.totalItems)
        console.log(res.data.totalItems)
    })
}