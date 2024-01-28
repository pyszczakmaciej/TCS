import {
  Button,
  Card,
  CardActions,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TestView } from "../../../../backend/tests/models/test-view.interface";

export interface ITestCardProps {
  test: TestView;
}

const deleteButtonSx: SxProps<Theme> = {
  color: "var(--color-error)",
  borderColor: "var(--color-error)",
  ":hover": {
    color: "var(--color-white)",
    borderColor: "var(--color-error)",
    background: "var(--color-error)",
  },
};

const activateButtonSx: SxProps<Theme> = {
  color: "var(--color-success)",
  background: "var(--color-secondary)",
  ":hover": {
    color: "var(--color-secondary)",
    borderColor: "var(--color-error)",
    background: "var(--color-success)",
  },
};

const deactivateButtonSx: SxProps<Theme> = {
  color: "var(--color-warning)",
  borderColor: "var(--color-warning)",
  ":hover": {
    color: "var(--color-secondary)",
    borderColor: "var(--color-warning)",
    background: "var(--color-warning)",
  },
};

const editButtonSx: SxProps<Theme> = {
  color: "var(--color-secondary)",
  background: "var(--color-primary)",
  ":hover": {
    color: "var(--color-primary)",
    borderColor: "var(--color-error)",
    background: "var(--color-secondary)",
  },
};

export function TestCard(props: ITestCardProps) {
  const { test } = props;
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minWidth: 275,
        background: "var(--color-dark)",
        color: "var(--color-light)",
      }}
    >
      <Typography
        sx={{
          width: "100%",
          padding: "0.5rem",
          textAlign: "right",
          color: test.active ? "var(--color-success)" : "var(--color-warning)",
        }}
        component="div"
      >
        {test.active
          ? "Udostępniony dla użytkowników"
          : "Nieudostępniony dla użytkowników"}
      </Typography>
      <CardContent sx={{ padding: "1rem" }}>
        {/* <Typography
          sx={{
            width: "100%",
            textAlign: "right",
            color: test.active
              ? "var(--color-success)"
              : "var(--color-warning)",
          }}
          component="div"
        >
          {test.active
            ? "Udostępniony dla użytkowników"
            : "Nieudostępniony dla użytkowników"}
        </Typography> */}
        <Typography
          sx={{ maxWidth: "100%", overflowWrap: "break-word" }}
          variant="h4"
          component="div"
        >
          {test.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Autor: {test.author.firstName} {test.author.lastName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Data utworzenia: {format(test.createdAt, "dd-MM-yyyy")}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingBottom: "1rem" }}>
        <Button
          onClick={() => navigate(`${test.uuid}`)}
          sx={editButtonSx}
          variant="contained"
          size="small"
        >
          Edytuj
        </Button>
        {test.active ? (
          <Button sx={deactivateButtonSx} variant="outlined" size="small">
            Dezaktywuj
          </Button>
        ) : (
          <Button sx={activateButtonSx} variant="contained" size="small">
            Udostępnij
          </Button>
        )}
        <Button sx={deleteButtonSx} variant="outlined" size="small">
          Usuń
        </Button>
      </CardActions>
    </Card>
  );
}
