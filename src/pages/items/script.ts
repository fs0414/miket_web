import { useState } from "react";
import { axiosClient } from "../../lib/axiosClient";

//---

export const [ categories, setCategories ] = useState<CategoryType[]>([])

//---

export const fetchCategories = async() => {
    await axiosClient.get('/categories')
    .then(res => {
        setCategories(res.data);
    })
}