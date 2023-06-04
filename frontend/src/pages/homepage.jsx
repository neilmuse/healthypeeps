import React, { useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import SearchField from '../components/search-field.jsx';
import RecipeFeed from './recipe-slider.jsx';
import Typography from '../components/typography.jsx';
import Box from '../components/box.jsx';
import HomepageHero from '../components/hero-section.jsx';

import { AuthContext } from '../context/auth-context';

const Homepage = () => {
  const { user } = useContext(AuthContext);

  const units = ['g', 'mg', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'lb', 'pieces'];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [price, setPrice] = useState('');
  const [macronutrients, setMacronutrients] = useState({
    protein: '',
    fat: '',
    carbohydrates: '',
  });
  const [instructions, setInstructions] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [preparationSteps, setPreparationSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setPreparationSteps([]);
    setIngredients([]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddPreparationStep = () => {
    setPreparationSteps([...preparationSteps, '']);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { value: '', unit: '', name: '' }]);
  };

  const handlePreparationStepChange = (index, value) => {
    const newPreparationSteps = [...preparationSteps];
    newPreparationSteps[index] = value;
    setPreparationSteps(newPreparationSteps);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleRemovePreparationStep = (index) => {
    const newPreparationSteps = [...preparationSteps];
    newPreparationSteps.splice(index, 1);
    setPreparationSteps(newPreparationSteps);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  let image;

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    switch (selectedCategory) {
      case 'review':
        post = {
          title,
          content,
          category: selectedCategory,
          image: image
        };
        break;
      case 'discussion':
        post = {
          title,
          content,
          category: selectedCategory,
          image: image
        };
        break;
      case 'recipe':
        post = {
          title,
          content,
          category: selectedCategory,
          image: image,
          brief: briefDescription,
          ingredients,
          instructions: preparationSteps,
          nutrition: macronutrients,
          preparationTime
        };
        break;
      case 'food_listing':
        post = {
          title,
          content,
          category: selectedCategory,
          image: image,
          price
        };
        break;
      default:
        alert('Invalid category');
        return;
    }  
  
    // POST request to the backend API to add the post
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset form fields
        setTitle('');
        setContent('');
        setBriefDescription('');
        setPreparationTime('');
        setPrice('');
        setIngredients([]);
        setMacronutrients({
          protein: '',
          fat: '',
          carbohydrates: '',
        });
        setInstructions([]);
        // Show success message
        alert('Post submitted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show error message
        alert('An error occurred while submitting the post.');
      });
  };

  return (
    <>
      <Box>
        <HomepageHero />

        <Typography variant="title" text= {user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />

        <Grid container justifyContent="center" alignItems="center">
          <Grid>
            <Typography variant="hero_title" text="What can we help you with?" />
            <SearchField />
          </Grid>
        </Grid>

        {loggedIn && (
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button onClick={handleOpenModal} color="primary" variant="contained">
                Add Post
              </Button>
            </Grid>
          </Grid>
        )}

        <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
          <DialogTitle>Add New Post</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory || ''} onChange={handleCategoryChange}>
                <MenuItem value="recipe">Recipe</MenuItem>
                <MenuItem value="listing">Listing</MenuItem>
                <MenuItem value="discussion">Discussion</MenuItem>
                <MenuItem value="review">Review</MenuItem>
              </Select>
            </FormControl>

            {selectedCategory && (
              <>
                <TextField fullWidth label="Title" style={{ marginTop: '1rem' }} />
                <TextField fullWidth label="Content" multiline rows={4} style={{ marginTop: '1rem' }} />
                <input type="file" style={{ marginTop: '1rem' }} />

                {selectedCategory === 'recipe' && (
                  <>
                    <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>Ingredients</Typography>
                    {ingredients.map((ingredient, index) => (
                      <MuiBox key={index} display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '1rem' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                            <TextField fullWidth label="Value" value={ingredient.value} onChange={(e) => handleIngredientChange(index, 'value', e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField label="Unit" select fullWidth value={ingredient.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}>
                              {units.map((unit) => (
                                <MenuItem key={unit} value={unit}>
                                  {unit}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
                          </Grid>
                          <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                            <IconButton onClick={() => handleRemoveIngredient(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </MuiBox>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={handleAddIngredient} style={{ marginTop: '1rem' }}>Add Ingredient</Button>

                    <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>Preparation Steps</Typography>
                    {preparationSteps.map((step, index) => (
                      <MuiBox key={index} display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '1rem' }}>
                        <TextField label={`Step ${index + 1}`} value={step} onChange={(e) => handlePreparationStepChange(index, e.target.value)} fullWidth />
                        <IconButton onClick={() => handleRemovePreparationStep(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </MuiBox>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={handleAddPreparationStep} style={{ marginTop: '1rem' }}>Add Step</Button>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="title" text="New Recipes" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/recipes" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>
        {/* <RecipeFeed /> */}

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="title" text="Discussions" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/discussions" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="title" text="Reviews" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/reviews" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="title" text="Listings" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/listings" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>

      </Box>
      <Outlet />
    </>
  );
};

export default Homepage;
