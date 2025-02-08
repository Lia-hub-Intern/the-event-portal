/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-09-10
 *     Program : Speakers.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Displays a list of speakers with filtering options.
 *
 */
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip"; // Importera Tooltip
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
import { useEffect, useState } from "react";
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image = "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";

export default function Speakres({ title }) {
    const [categories, setCategories] = useState([]);
    const [speakers, setSpeakers] = useState(listSpeakers);

    useEffect(() => {
        const listCategories = [
            ...new Set(
                listSpeakers
                    .map((res) => res.category.split(","))
                    .flat()
                    .map((category) => category.trim())
            ),
        ].map((category) => ({ title: category }));

        setCategories([...listCategories]);
    }, []);

    const filterSpeakers = (event, newValue) => {
        newValue = newValue.map((value) => value.title.trim().toLowerCase());
        const filter = listSpeakers.filter((speaker) => {
            const categorySpeaker = speaker.category
                .split(",")
                .map((category) => category.trim().toLowerCase());
            const match = categorySpeaker.some((category) =>
                newValue.includes(category.toLowerCase())
            );
            return match;
        });
        setSpeakers(newValue.length > 0 ? [...filter] : [...listSpeakers]);
    };

    return (
        <>
            <HeaderSida headerTitle={"Meet Our Speakers"} headerImage={Image} />
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center", display: { xs: "block", sm: "flex" } }}>
                <Grid container sx={{ item: { xs: 12, sm: 6, md: 4 }, justifyContent: "center" }}>
                    <Box sx={{ width: { xs: "20rem", sm: "auto" }, marginBottom: "1rem " }}>
                        <Typography variant="h4" sx={{ marginBottom: "1rem", textAlign: "center" }}>{title}</Typography>
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={categories}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            onChange={filterSpeakers}
                            renderOption={(props, option, { selected }) => (
                                <MenuItem key={props.key} {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                                    {option.title}
                                </MenuItem>
                            )}
                            renderInput={(params) => <TextField {...params} label="Select your favorite speakers" placeholder="Favorites" />}
                        />
                    </Box>
                </Grid>
                <Grid container spacing={10} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ item: { xs: 12, sm: 6, md: 4 }, justifyContent: "center" }}>
                    {speakers.map((item) => (
                        <Card key={item.name} sx={{ transition: "0.2s", "&:hover": { transform: "scale(1.05)" }, width: { xs: "38vh", sm: "50vh" }, height: { xs: "72vh", sm: "110vh" }, marginLeft: { sm: "1rem" }, marginTop: "2rem" }}>
                            <CardActionArea>
                                <Tooltip
                                    title={
                                        item.youtubeLink ? (
                                            <iframe
                                                width="200"
                                                height="113"
                                                src={item.youtubeLink.replace("watch?v=", "embed/")}
                                                title="YouTube video"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ borderRadius: "8px" }}
                                            ></iframe>
                                        ) : "No video available"
                                    }
                                    placement="top"
                                    arrow
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt="Card Image"
                                        sx={{ height: { xs: "48vh", sm: "60vh" }, objectFit: "cover" }}
                                    />
                                </Tooltip>
                                <CardContent sx={{ height: "9rem" }}>
                                    <Typography variant="h5" sx={{ paddingBottom: "1rem", textTransform: "capitalize" }}>{item.name}</Typography>
                                    <Typography variant="p1" component="p" sx={{ paddingBottom: "0.5rem" }}>{item.title}</Typography>
                                    <Typography variant="body1">{item.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}