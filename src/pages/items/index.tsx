import { useState, useEffect } from 'react';
import { Box, Button, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import { axiosClient } from '../../lib/axiosClient';
import { useNavigate } from '@tanstack/react-location';
import { getUserId } from '../../lib/cookieClient';
import { CategoryType } from '../../types/category';
import { ItemType } from '../../types/item';

export const Items = () => {
    const [ categories, setCategories ] = useState<CategoryType[]>([])

    const [ categoryId, setCategoryId ] = useState('')

    const [itemId, setItemId] = useState<string>('')
    const [itemName, setItemName] = useState<string>('')
    const [itemCategory, setItemCategory] = useState<string>('')
    const [itemQuantity, setItemQuantity] = useState<number>()

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
            setCategories(res.data);
        })
    }

    // item登録系
    const findCategoryIdByName = (itemCategory: string) => {
        const findCategoryId = categories.find(category => category.name === itemCategory)
        return findCategoryId ? findCategoryId.id : null
    }

    const createItemHandler = () => {        
        const getCategoryId = findCategoryIdByName(itemCategory)

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
    const handleItemClick = (itemId: string, categoryName: string) => {
        console.log({ categoryName })
        const findCategory = categories.find((category) => category.name === categoryName)
        console.log({ findCategory })
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
        setItemCategory(findCategory.name)
        setItemName(findItem.name)
        setItemQuantity(findItem.quantity)
    }

    const updateItemHandler = async() => {
        const getCategoryId = findCategoryIdByName(itemCategory)
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
        <div className="flex flex-col items-start ml-16 mb-10">
            <div className="mt-20 mb-16 ml-20">
                <Button variant="outlined" onClick={() => setCreateItemIsOpen(true)}>アイテム登録</Button>
            </div>
            <div className='flex justify-center sm::flex-row'>
                <div className=''>
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
                                                            onClick={() => handleItemClick(item.id, category.name)}
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
                <div className=''>
                    {categories.map((category) => {
                        if (category.name == "furniture"){
                            return (
                                <div key={category.id}>
                                    <div className='mb-5 mr-20'>
                                        <h3>家具</h3>
                                    </div>
                                    <div>
                                        <ul className=''>
                                            {category.items.map((item: { id: string; name: string; quantity: number }) => {
                                                return (
                                                    <button key={item.id} 
                                                            onClickCapture={() => setUpdateItemIsOpen(true)}
                                                            onClick={() => handleItemClick(item.id, category.name)}
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
                <div className=''>
                    {categories.map((category) => {
                        if (category.name == "fashion"){
                            return (
                                <div key={category.id}>
                                    <div className='mb-5 mr-20'>
                                        <h3>衣服</h3>
                                    </div>
                                    <div>
                                        <ul className=''>
                                            {category.items.map((item: { id: string; name: string; quantity: number }) => {
                                                return (
                                                    <button key={item.id}
                                                            onClickCapture={() => setUpdateItemIsOpen(true)}
                                                            onClick={() => handleItemClick(item.id, category.name)} 
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
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 400,
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <div>
                        <div>
                            <h3>アイテム登録</h3>
                        </div>
                        <div>
                            <Box component="form">
                                <div className='mt-5 mb-5'>
                                    <InputLabel>アイテム名</InputLabel>
                                    <TextField
                                        fullWidth
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setItemName(event.target.value as string);
                                        }}
                                        required
                                    />
                                </div>
                                <div className='mb-5'>
                                    <InputLabel>カテゴリ</InputLabel>
                                    <Select
                                        fullWidth
                                        size='small'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => setItemCategory(e.target.value as string)}
                                        label="Age"
                                        required
                                    >
                                        <MenuItem value={'goods'}>日用品</MenuItem>
                                        <MenuItem value={'furniture'}>家具</MenuItem>
                                        <MenuItem value={'fashion'}>衣服</MenuItem>
                                    </Select>
                                </div>
                                <div className='mb-5'>
                                    <InputLabel>個数</InputLabel>
                                    <TextField
                                        size='small'
                                        type="number"
                                        inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*"
                                        }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setItemQuantity(parseInt(event.target.value));
                                        }}
                                        required
                                    />
                                </div>
                                <Button variant="outlined" onClick={createItemHandler}>Outlined</Button>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Modal>

            {/* 更新用モーダル */}
            <Modal
                open={updateItemIsOpen}
                onClose={() => setUpdateItemIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: 400,
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <div>
                        <div>
                            <h3>アイテム更新</h3>
                        </div>
                        <div>
                            <Box component="form">
                                <div className='mt-5 mb-5'>
                                    <InputLabel>アイテム名</InputLabel>
                                    <TextField
                                        fullWidth
                                        value={itemName}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setItemName(event.target.value as string);
                                        }}
                                        required
                                    />
                                </div>
                                <div className='mb-5'>
                                    <InputLabel>カテゴリ</InputLabel>
                                    <Select
                                        fullWidth
                                        size='small'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={itemCategory}
                                        // defaultValue={itemCategory}
                                        onChange={(e) => setItemCategory(e.target.value as string)}
                                        label="Age"
                                        required
                                    >
                                        <MenuItem value={'goods'}>日用品</MenuItem>
                                        <MenuItem value={'furniture'}>家具</MenuItem>
                                        <MenuItem value={'fashion'}>衣服</MenuItem>
                                    </Select>
                                </div>
                                <div className='mb-5'>
                                    <InputLabel>個数</InputLabel>
                                    <TextField
                                        size='small'
                                        type="number"
                                        inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*"
                                        }}
                                        value={itemQuantity}
                                        // defaultValue={itemQuantity}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setItemQuantity(parseInt(event.target.value));
                                        }}
                                        required
                                    />
                                </div>
                                <div className='flex flex-row'>
                                    <div className='mr-5'>
                                        <Button variant="outlined" onClick={updateItemHandler}>更新</Button>
                                    </div>
                                    <div>
                                        <Button variant="outlined" color="error" onClick={deleteItemHandler}>削除</Button>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
  }