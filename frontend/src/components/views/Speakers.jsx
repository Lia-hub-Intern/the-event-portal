import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox"; // har importerat en checkbox component from Material UI
import TextField from "@mui/material/TextField"; // har importerat en text field for att man kan skriva sin mejl
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox"; // en check box som man kan klicka på
import { listSpeakers } from "../functions/Functions";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Grid,
    MenuItem,
} from "@mui/material";
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image = "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";

export default function Speakers({ title }) {
    const [categories, setCategories] = useState([]);
    const [speakers, setSpeakers] = useState(listSpeakers);
    const [favorites, setFavorites] = useState([]); // State for favorite speaker
    const [email, setEmail] = useState(""); // State for storing mejl input

    useEffect(() => {
        const listCategories = [
            ...new Set(
                listSpeakers
                    .map((res) => res.category.split(","))
                    .flat() // Flatten the array
                    .map((category) => category.trim())
            ),
        ].map((category) => ({ title: category }));

        setCategories([...listCategories]);

        // Load favorites speakers from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);

        // Load the email from localStorage
        const savedEmail = localStorage.getItem("email") || "";
        setEmail(savedEmail);
    }, []);

    const filterSpeakers = (event, newValue) => {
        newValue = newValue.map((value) => value.title.trim().toLowerCase());

        const filter = listSpeakers.filter((speaker) => {
            const categorySpeaker = speaker.category
                .split(",")
                .map((category) => category.trim().toLowerCase());
            return categorySpeaker.some((category) =>
                newValue.includes(category.toLowerCase())
            );
        });

        setSpeakers(newValue.length > 0 ? filter : listSpeakers);
    };

    // en function to favorite state for a speaker
    const toggleFavorite = (speaker) => {
        const updatedFavorites = favorites.includes(speaker.title)
            ? favorites.filter((fav) => fav !== speaker.title) // att kan remove from favorites
            : [...favorites, speaker.title]; // Add to favorites

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
    };

    // en function to handle email input change
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        localStorage.setItem("email", newEmail); // update local Storage with a new email
    };

    return (
        <>
            <HeaderSida headerTitle={"Meet Our Speakers"} headerImage={Image} />
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center", display: { xs: "block", sm: "flex" } }}>
                <Grid container sx={{ item: { xs: 12, sm: 6, md: 4 }, justifyContent: "center" }}>
                    <Box sx={{ width: { xs: "20rem", sm: "auto" }, marginBottom: "1rem" }}>
                        <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>
                            {title}
                        </Typography>

                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={categories}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            onChange={filterSpeakers}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props;

                                return (
                                    <MenuItem key={key} {...optionProps}>
                                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                        {option.title}
                                    </MenuItem>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Select your favorite speakers" placeholder="Favorites" />
                            )}
                        />
                    </Box>
                </Grid>

                <Grid container spacing={10} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ item: { xs: 12, sm: 6, md: 4 }, justifyContent: "center" }}>
                    {speakers.map((item) => (
                        <Card
                            key={item.title}
                            sx={{
                                transition: "0.2s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                                width: { xs: "38vh", sm: "50vh" },
                                height: { xs: "72vh", sm: "110vh" },
                                marginLeft: { sm: "1rem" },
                                marginTop: "2rem",
                                textDecoration: "none",
                            }}
                        >
                            <CardActionArea>
                                <CardMedia component="img" image={item.image} alt="Card Image" sx={{ height: { xs: "48vh", sm: "60vh" }, objectFit: "cover" }} />
                                <CardContent sx={{ height: "9rem", justifyContent: "left", justifyItems: "left" }}>
                                    <Typography variant="h5" sx={{ paddingBottom: "1rem", textTransform: "capitalize" }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="p1" component="p" sx={{ paddingBottom: "0.5rem" }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1">{item.description}</Typography>

                                    {/* checkbox to mark like favorite speakers */}
                                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                                        <Checkbox
                                            checked={favorites.includes(item.title)}
                                            onChange={() => toggleFavorite(item)}
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                        />
                                        <Typography variant="body2">
                                            Follow this speaker for updates
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ display: favorites.includes(item.title) ? 'block' : 'none' }}>
                                        Favorite
                                    </Typography>

                                    {/* Subscription to email */}
                                    {favorites.includes(item.title) && (
                                        <Box sx={{ marginTop: "1rem" }}>
                                            <Typography variant="subtitle1">Subscribe to get information about this speaker:</Typography>
                                            <TextField
                                                label="Your email"
                                                variant="outlined"
                                                fullWidth
                                                value={email} // bind email input
                                                onChange={handleEmailChange} // handle email change
                                                sx={{ marginTop: "0.5rem" }}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}
