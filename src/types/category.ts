import { ItemType } from './item'

export type CategoryType = {
    id: string;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    items: ItemType[];
}