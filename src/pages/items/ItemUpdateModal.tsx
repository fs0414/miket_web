import { Dispatch, SetStateAction } from "react";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ReturnVoidFunctionType } from "../../types/returnVoidFunc";

interface ItemUpdateModalProps {
    itemName: string;
    categoryOfItem: string;
    itemQuantity: number;
    setItemName: Dispatch<SetStateAction<string>>;
    setCategoryOfItem: Dispatch<SetStateAction<string>>;
    setItemQuantity: Dispatch<SetStateAction<number>>;
    updateItemHandler: ReturnVoidFunctionType;
    deleteItemHandler: ReturnVoidFunctionType;
}

export const ItemUpdateModal: React.FC<ItemUpdateModalProps> = ({
    itemName, setItemName,
    categoryOfItem, setCategoryOfItem,
    itemQuantity, setItemQuantity,
    updateItemHandler, deleteItemHandler
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
                                        value={categoryOfItem}
                                        onChange={(e) => setCategoryOfItem(e.target.value as string)}
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
        </div>
    )
}