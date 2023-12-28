import { atom } from "jotai";
import { CategoryType } from '../../types/category';

export const userAtom = atom(null)

export const categoriesAtom = atom<CategoryType[]>([])

export const totalItemsAtom = atom(0)

export const maxItemsAtom = atom(0)