/**
 * BeASpeaker
 */
import * as React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Grid,
  ListItemText,
} from "@mui/material";

export default function BeASpeaker() {
  return (
    <>
      <Button sx={{ marginBottom: "60px" }} variant="text" color="primary">
        <KeyboardBackspaceIcon /> Take me back
      </Button>

      <p>JOIN THE FAMILY</p>
      <h1>Become a speaker today!</h1>

      <p></p>
      <h1>
        Become a partner of Compony <br /> Business Forum
      </h1>
      <p>
        If you are looking to make your brand known thousands of business owners
        <br />
        and to build relations with the top C-level executives, there is no
        better way to reach <br />
        your audience than with a tailored partnership with Oslo Business Forum
      </p>
      <br />
      <p>
        Together with you, we can design a unique partnership. Our common goal
        is to <br />
        increase your brand visibility and to help you create meaningful
        encounters with <br />
        your target audience and with business executives that can otherwise be
        difficult to <br /> reach.
      </p>
      <br />
      <p>
        For more information, contact us - we'd be happy to find you the best
        partnership <br />
        solution.
      </p>
      <div sx={{ p: "50px" }}>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField fullWidth label="First name" id="fullWidth" />
          <TextField fullWidth label="Email" id="fullWidth" />
          <TextField fullWidth label="Phone number" id="fullWidth" />
          <TextField fullWidth label="Compony name" id="fullWidth" />
          <TextField fullWidth label="Comments" id="fullWidth" />
        </Box>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField fullWidth label="First name" id="fullWidth" />
          <TextField fullWidth label="Email" id="fullWidth" />
          <TextField fullWidth label="Phone number" id="fullWidth" />
          <TextField fullWidth label="Compony name" id="fullWidth" />
          <TextField fullWidth label="Comments" id="fullWidth" />
        </Box>
      </div>
      <Grid item={true} xs={12} sm={6} md={6} lg={3}>
        <ListItemText
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: 1,
            width: "7rem",
          }}
        ></ListItemText>
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ width: "10rem", marginLeft: 1 }}
          // disabled={
          //   names !== "" &&
          //   address !== "" &&
          //   email !== "" &&
          //   telefon !== "" &&
          //   delivery !== "" &&
          //   payment !== "" &&
          //   shoppingCart.length > 0
          //     ? false
          //     : true
          // }
          // component={NavLink}
          // to={`/Payment/${names}/${address}/${email}/${telefon}/${delivery}/${payment}`}
        >
          Get more info now
        </Button>

        <Box
          component="form"
          // onSubmit={onSubmit}
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            //   id="names"
            //   type="text"
            //   size="small"
            //   error={errorNames.error}
            //   helperText={errorNames.message}
            //   onChange={(e) => setNames(e.target.value)}
            //   value={names}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            //   id="address"
            //   type="address"
            //   size="small"
            //   onChange={(e) => setAddress(e.target.value)}
            //   value={address}
            required
          />

          <TextField
            label="Email"
            variant="outlined"
            //   id="email"
            //   type="email"
            //   size="small"
            //   error={errorEmail.error}
            //   helperText={errorEmail.message}
            //   onChange={(e) => setEmail(e.target.value)}
            //   value={email}
            required
          />
          <TextField
            label="Telefon"
            variant="outlined"
            //   id="telefon"
            //   type="number"
            //   size="small"
            //   onChange={(e) => setTelefon(e.target.value)}
            //   value={telefon}
            required
          />
          {/* <TextField
                  label="Delivery options"
                  variant="outlined"
                  id="delivery"
                  select
                  size="small"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {curdelivery.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setDelivery(option.label)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
          {/* <TextField
                  label="Payment"
                  variant="outlined"
                  id="payment"
                  select
                  size="small"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {curpayment.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => setPayment(option.label)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
        </Box>
      </Grid>
    </>
  );
}
