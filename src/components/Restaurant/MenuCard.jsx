import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from "react";
import { CategorizeIngredients } from "../utils/CategorizeIngredients";
import { ingredientsReducer } from "../State/Ingredients/Reducer";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";


export const MenuCard = ({ item }) => {
  console.log(item, "MENU ITEM")

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch= useDispatch();


  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients
      }
    }

    console.log("REQ DATA : ",reqData)
    dispatch(addItemToCart(reqData))
  }

  const handleCheckBoxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName))
    }
    else {
      setSelectedIngredients([...selectedIngredients, itemName])
    }
    console.log(selectedIngredients)
  }

  return (
    <div>  <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img className="w-[7rem] h-[7rem] object-cover" src={item.images[0]} alt="">
            </img>
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>$ {item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {
              Object.keys(CategorizeIngredients(item.ingredientsItems)).map((category) =>
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {CategorizeIngredients(item.ingredientsItems)[category].map((item) => (
                      <FormControlLabel key={item.id} control={<Checkbox onChange={() => handleCheckBoxChange(item.name)} />} label={item.name} />)
                    )}
                  </FormGroup>
                </div>
              )
            }
          </div>

          <div className="pt-5">
          {/* onChange={() => { handleOnChange("item_food") }} */}
            <Button variant="contained" disabled={false} type="submit">{item.available ? "Add to Cart" : "Out of Stock"}</Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion></div>
  )
}