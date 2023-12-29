import { useState, useEffect } from 'react';
import { Button, Modal} from '@mui/material';
import { axiosClient } from '../../lib/axiosClient';
import { useNavigate } from '@tanstack/react-location';
import { getUserId } from '../../lib/cookieClient';
import { ItemType } from '../../types/item';
import { useAtom } from 'jotai';
import { categoriesAtom, maxItemsAtom, totalItemsAtom } from '../../lib/atoms/user';
import { ItemCreateModal } from './itemCreateModal';
import { ItemUpdateModal } from './ItemUpdateModal';

export const Items = () => {
    const [ categories, setCategories ] = useAtom(categoriesAtom)
    const [ categoryId, setCategoryId ] = useState('0')

    const [itemId, setItemId] = useState<string>('0')
    const [itemName, setItemName] = useState<string>('')
    const [categoryOfItem, setCategoryOfItem] = useState<string>('goods')
    const [itemQuantity, setItemQuantity] = useState<number>(0)
    
    const [totalItems, setTotalItems ] = useAtom(totalItemsAtom)
    const [maxItems, setMaxItems ] = useAtom(maxItemsAtom)

    const [ createItemIsOpen, setCreateItemIsOpen ] = useState<boolean>(false)
    const [ updateItemIsOpen, setUpdateItemIsOpen ] = useState<boolean>(false)

    const userId = getUserId()
    const navigate = useNavigate()

    useEffect(() => {
      if(!userId) {
        console.log("not user state")
        navigate({ to: "/signin" })
      }
      fetchCategories()
    }, [])

    // fetch categories
    const fetchCategories = async() => {
        await axiosClient.get('/categories')
        .then(res => {
            setCategories(res.data.categories)
            setTotalItems(res.data.totalItems)
            setMaxItems(res.data.maxItems)
        })
    }

    // item登録系
    const findCategoryIdByName = (itemCategory: string): string | null => {
        const findCategoryId = categories.find(category => category.name === itemCategory)
        return findCategoryId ? findCategoryId.id : null
    }

    const createItemHandler = (): void => {
        const getCategoryId = findCategoryIdByName(categoryOfItem)

        if(totalItems >= maxItems) {
            alert('アイテム数が設定値の上限を超えています')
            return
        }

        axiosClient.post(`/categories/${getCategoryId}/items`, {
            name: itemName,
            quantity: itemQuantity
        })
        .then(() => {
            setCreateItemIsOpen(false)
            fetchCategories()
        })
        .catch(err => {
            console.log(err)
        })
    }

    // item更新系
    const handleUpdateItemModal = (itemId: string, categoryName: string) => {
        const findCategory = categories.find((category) => category.name === categoryName)
        if (!findCategory) {
            console.error('Category not found');
            return;
        }
        
        const findItem = findCategory.items.find((item: ItemType) => item.id === itemId )
        
        if(!findItem) {
            console.error('item not found');
            return;
        }
        
        //updateItemHandlerのpath parameterに使用
        setCategoryId(findCategory.id)
        setItemId(findItem.id)
        // 更新モーダルのplaceholderに使用
        setCategoryOfItem(findCategory.name)
        setItemName(findItem.name)
        setItemQuantity(findItem.quantity)
    }

    const updateItemHandler = async() => {
        const getCategoryId = findCategoryIdByName(categoryOfItem)
        await axiosClient.put(`categories/${categoryId}/items/${itemId}`, {
            name: itemName,
            quantity: itemQuantity,
            category_id: getCategoryId
        })
        .then(() => {
            setUpdateItemIsOpen(false)
            fetchCategories()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const deleteItemHandler = async() => {
        await axiosClient.delete(`categories/${categoryId}/items/${itemId}`)
        .then(() => {
            setUpdateItemIsOpen(false)
            fetchCategories()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex flex-col'>
            <div className="text-left mt-20 mb-16 ml-32">
                <Button variant="outlined" onClick={() => setCreateItemIsOpen(true)}>アイテム登録</Button>
            </div>
            <div className='flex justify-center pc:flex-row sp:flex-col ml-12'>
                <div className='flex-1'>
                    {categories.map((category) => {
                        if (category.name == "goods"){
                            return (
                                <div key={category.id}>
                                    <div className='mb-3 mr-20'>
                                        <h3>生活用品</h3>
                                    </div>
                                    <div>
                                        <ul className=''>
                                            {category.items.map((item: { id: string; name: string; quantity: number }) => {
                                                return (
                                                    <button key={item.id} 
                                                            onClickCapture={() => setUpdateItemIsOpen(true)}
                                                            onClick={() => handleUpdateItemModal(item.id, category.name )}
                                                            className='border border-gray-700 shadow-2xl w-60 h-15 m-2 mr-20 ml-5'>
                                                        <div className='flex justify-between m-5'>
                                                            <li className=''>{ item.name }</li>
                                                            <li className='mt-1 text-xs text-gray-5 00'>個数 :  { item.quantity }</li>
                                                        </div>
                                                    </button>
                                                ) 
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                        
                    })}
                </div>
                <div className='flex-1'>
                    {categories.map((category) => {
                        if (category.name == "furniture"){
                            return (
                                <div key={category.id}>
                                    <div className='mb-3 mr-20'>
                                        <h3>家具</h3>
                                    </div>
                                    <div>
                                        <ul className=''>
                                            {category.items.map((item: { id: string; name: string; quantity: number }) => {
                                                return (
                                                    <button key={item.id} 
                                                            onClickCapture={() => setUpdateItemIsOpen(true)}
                                                            onClick={() => handleUpdateItemModal(item.id, category.name)}
                                                            className='border border-gray-700 shadow-2xl w-60 h-15 m-2 mr-20 ml-5'>
                                                        <div className='flex justify-between m-5'>
                                                            <li className=''>{ item.name }</li>
                                                            <li className='mt-1 text-xs text-gray-5 00'>個数 :  { item.quantity }</li>
                                                        </div>
                                                    </button>
                                                ) 
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                        
                    })}
                </div>
                <div className='flex-1'>
                    {categories.map((category) => {
                        if (category.name == "fashion"){
                            return (
                                <div key={category.id}>
                                    <div className='mb-3 mr-20'>
                                        <h3>衣服</h3>
                                    </div>
                                    <div>
                                        <ul className=''>
                                            {category.items.map((item: { id: string; name: string; quantity: number }) => {
                                                return (
                                                    <button key={item.id}
                                                            onClickCapture={() => setUpdateItemIsOpen(true)}
                                                            onClick={() => handleUpdateItemModal(item.id, category.name)} 
                                                            className='border border-gray-700 shadow-2xl w-60 h-15 m-2 mr-20 ml-5'>
                                                        <div className='flex justify-between m-5'>
                                                            <li className=''>{ item.name }</li>
                                                            <li className='mt-1 text-xs text-gray-5 00'>個数 :  { item.quantity }</li>
                                                        </div>
                                                    </button>
                                                ) 
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>

            {/* 登録用modal */}
            <Modal
                open={createItemIsOpen}
                onClose={() => setCreateItemIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ItemCreateModal 
                    setItemName={setItemName}
                    createItemHandler={createItemHandler}
                    categoryOfItem={categoryOfItem}
                    setCategoryOfItem={setCategoryOfItem}
                    setItemQuantity={setItemQuantity}
                />
            </Modal>

            {/* 更新用モーダル */}
            <Modal
                open={updateItemIsOpen}
                onClose={() => setUpdateItemIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ItemUpdateModal
                    itemName={itemName}
                    setItemName={setItemName}
                    categoryOfItem={categoryOfItem}
                    setCategoryOfItem={setCategoryOfItem}
                    itemQuantity={itemQuantity}
                    setItemQuantity={setItemQuantity}
                    updateItemHandler={updateItemHandler}
                    deleteItemHandler={deleteItemHandler}
                />
            </Modal>
        </div>
    )
  }