import React, { useEffect, useState, useContext } from 'react';
import { Alert, Snackbar, Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import RecipeCard from '../views/recipe-card.jsx';
import SearchField from '../components/search-field.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory, authUploadFile } from "../auth";

const RecipeFeed = () => {
  const units = ['g', 'mg', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'lb', 'pieces'];
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [preparationSteps, setPreparationSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [macronutrients, setMacronutrients] = useState({ protein: '', calories: '', carbs: '' });
  const [preparationTime, setPreparationTime] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const category = "recipes";

  useEffect(() => {
      const fetchRecipes = async () => {
          try {
              let allRecipes = await authGetAllPostsByCategory(category);
              // Sort recipes from newest to oldest
              allRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setRecipes(allRecipes);
          } catch (error) {
              console.error('Error fetching recipes:', error);
          }
          };

      fetchRecipes();
  }, []);

  const handleOpenModal = () => {
      setModalOpen(true);
  };

  const handleCloseModal = () => {
      setModalOpen(false);
      setTitle('');
      setContent('');
      setImage(null);
      setIngredients([]);
      setPreparationSteps([]);
      setMacronutrients({ protein: '', calories: '', carbs: '' });
      setPreparationTime('');
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

  const handleFormSubmit = async (event) => {
      event.preventDefault();

      let uploadedImageUrl = null;

      if (image) {
          try {
              const uploadedFileResponse = await authUploadFile(image);
              uploadedImageUrl = uploadedFileResponse.url; // Store the URL from the response
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      }

      const recipePost = {
        category: "recipe",
        author: user,
        title,
        content,
        image: uploadedImageUrl,
        ingredients: ingredients,
        macros: macronutrients,
        preparation: preparationSteps,
        preparationTime: preparationTime
    };

      try {
          const response = await authAddPost(recipePost);
          handleCloseModal();
          setRecipes(prevRecipes => [response, ...prevRecipes]);  //adding the new post at the start of the array
          setRefetchTrigger(prev => !prev);
          setSuccessAlertOpen(true); // Open the success alert
          fetchRecipes(); // re-fetch the recipes
      } catch (error) {
          console.error('Error saving recipe post:', error);
      }
  };

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessAlertOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery)
  );
  
  return (
    <>
    <Box>

      <Container maxWidth="md">

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >

          <Grid item>
            <Typography variant="title" text={user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />

            <Grid item>
              <SearchField category={category} triggerRefetch={refetchTrigger} onSearch={handleSearch} />
            </Grid>

            <Divider />

            {user ? (
              <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Recipe </Button>
            ): null }
            
            <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
              <DialogTitle>Add New Recipe</DialogTitle>
              <DialogContent>

                <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />

                <TextField fullWidth label="Content" multiline rows={4} value={content} onChange={e => setContent(e.target.value)} />
                <input type="file" onChange={e => setImage(e.target.files[0])} />

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
      

                <Typography variant="subtitle1" style={{ marginTop: '1rem' }}> Preparation Steps </Typography>
                {preparationSteps.map((step, index) => (
                  <MuiBox key={index} display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: '1rem' }}>
                    <TextField label={`Step ${index + 1}`} value={step} onChange={(e) => handlePreparationStepChange(index, e.target.value)} fullWidth />
                    <IconButton onClick={() => handleRemovePreparationStep(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </MuiBox>
                ))}
                <Button startIcon={<AddIcon />} onClick={handleAddPreparationStep} style={{ marginTop: '1rem' }}>Add Step</Button>

                <Typography variant="subtitle1" style={{ marginTop: '1rem' }}>Macronutrients</Typography>

                <TextField
                  label="Protein"
                  value={macronutrients.protein}
                  onChange={(e) => setMacronutrients({ ...macronutrients, protein: e.target.value })}
                  style={{ marginRight: '1rem', marginTop: '1rem' }}
                />

                <TextField
                  label="Calories"
                  value={macronutrients.calories}
                  onChange={(e) => setMacronutrients({ ...macronutrients, calories: e.target.value })}
                  style={{ marginRight: '1rem', marginTop: '1rem' }}
                />

                <TextField
                  label="Carbs"
                  value={macronutrients.carbs}
                  onChange={(e) => setMacronutrients({ ...macronutrients, carbs: e.target.value })}
                  style={{ marginTop: '1rem' }}
                />

                <TextField
                  label="Preparation Time (minutes)"
                  value={preparationTime}
                  onChange={(e) => setPreparationTime(e.target.value)}
                  style={{ marginTop: '1rem' }}
                />
                  </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                    <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
                  </DialogActions>
            </Dialog>

            <Box value={3}>
              <Typography variant="title" text="Recipes" />
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <RecipeCard 
                      key={recipe._id}
                      recipeId={recipe._id}
                      title={recipe.title} 
                      image={recipe.image} 
                      author={recipe.author} 
                      createdAt={recipe.createdAt} 
                      content={recipe.content} 
                      authorId={recipe.author}
                      macronutrients={recipe.macros}
                    />
                ))) : (
                  <Typography variant="body" text="No recipes found." />
                )}
            </Box>
          </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar open={successAlertOpen} autoHideDuration={5000} onClose={handleSuccessAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
          Post successfully added!
        </Alert>
      </Snackbar>
    </>
  );
};

export default RecipeFeed;