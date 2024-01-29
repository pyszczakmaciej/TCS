import {
  Button,
  Card,
  CardActions,
  CardContent,
  SxProps,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import TestsService from "../../../../backend/tests/Tests.service";
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

const editButtonSx: SxProps<Theme> = {
  color: "var(--color-secondary)",
  background: "var(--color-primary)",
  ":hover": {
    color: "var(--color-primary)",
    borderColor: "var(--color-error)",
    background: "var(--color-secondary)",
  },
  ":disabled": {
    color: "var(--color-dark)",
    background: "var(--color-light)",
    opacity: "0.4",
  },
};

export function TestCard(props: ITestCardProps) {
  const { test } = props;
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1024px)");

  const activateTest = (testUuid: string) => {
    TestsService.activateTest(testUuid);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        background: "var(--color-dark)",
        color: "var(--color-ligt)",
      }}
    >
      <CardContent sx={{ padding: "1rem" }}>
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
      <CardActions
        sx={{
          paddingBottom: "1rem",
          display: "flex",
          flexDirection: matches ? "row" : "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          {test.active ? (
            <Tooltip title="Nie można edytować udostępnionego testu.">
              <span>
                <Button
                  sx={editButtonSx}
                  variant="contained"
                  size="small"
                  disabled={test.active}
                >
                  Edytuj
                </Button>
              </span>
            </Tooltip>
          ) : (
            <Button
              hidden={test.active}
              onClick={() => navigate(`${test.uuid}`)}
              sx={editButtonSx}
              variant="contained"
              size="small"
            >
              Edytuj
            </Button>
          )}
          {!test.active ? (
            <Button
              onClick={() => activateTest(test.uuid)}
              sx={activateButtonSx}
              variant="contained"
              size="small"
            >
              Udostępnij
            </Button>
          ) : null}
          <Button sx={deleteButtonSx} variant="outlined" size="small">
            Usuń
          </Button>
        </div>

        <Typography
          sx={{
            width: "100%",
            padding: "0.5rem",
            textAlign: matches ? "right" : "center",
            // textAlign: "right",

            color: test.active
              ? "var(--color-success)"
              : "var(--color-warning)",
          }}
          component="div"
        >
          {test.active
            ? "Udostępniony dla użytkowników"
            : "Nieudostępniony dla użytkowników"}
        </Typography>
      </CardActions>
    </Card>
  );
}
