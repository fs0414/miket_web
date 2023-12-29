import { Dispatch, SetStateAction } from 'react'
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { ReturnVoidFunctionType } from '../../types/returnVoidFunc';

interface ItemCreateModalProps {
    // createItemHandler: CreateItemHandlerType;
    createItemHandler: ReturnVoidFunctionType;
    categoryOfItem: string
    setItemName: Dispatch<SetStateAction<string>>;
    setCategoryOfItem: Dispatch<SetStateAction<string>>
    setItemQuantity: Dispatch<SetStateAction<number>>;
}

export const ItemCreateModal: React.FC<ItemCreateModalProps> = ({
    setItemName, createItemHandler, categoryOfItem, setCategoryOfItem, setItemQuantity
}) => {
    return (
        <div>
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
                                    <label className='text-gray-200'>カテゴリ</label>
                                    <select 
                                        value={categoryOfItem} 
                                        onChange={(e) => setCategoryOfItem(e.target.value as string)}
                                        className='block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                    >
                                        <option value={'goods'}>日用品</option>
                                        <option value={'furniture'}>家具</option>
                                        <option value={'fashion'}>服装</option>
                                    </select>
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
        </div>
    )
}