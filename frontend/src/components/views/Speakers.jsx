import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Typography } from '@mui/material';
import { top100Films } from '../functions/Functions';
import Grid from '@mui/material/Grid2';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Speakers() {
	return (
		<>
			<Box>
				<Grid>
					<Typography variant="h3">Events</Typography>
					<Autocomplete
						multiple
						id="checkboxes-tags-demo"
						options={top100Films}
						disableCloseOnSelect
						getOptionLabel={(option) => option.title}
						renderOption={(props, option, { selected }) => {
							const { key, ...optionProps } = props;
							return (
								<li key={key} {...optionProps}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.title}
								</li>
							);
						}}
						style={{ width: 500 }}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Checkboxes"
								placeholder="Favorites"
							/>
						)}
					/>
				</Grid>
			</Box>
		</>
	);
}
