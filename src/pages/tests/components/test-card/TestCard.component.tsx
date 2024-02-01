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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestsService from "../../../../backend/tests/Tests.service";
import { TestView } from "../../../../backend/tests/models/test-view.interface";
import AppState from "../../../../store/App.state";
import { SolvedTestSummaryDialog } from "../preview-solved-test-dialog/SolvedTestSummaryDialog.component";
import { SolveTestDialog } from "../solve-test-dialog/SolveTestDialog.component";

export interface ITestCardProps {
  test: TestView;
}

const buttonSizeSx: SxProps<Theme> = {
  minWidth: "fit-content",
  padding: "0.5rem",
  fontSize: "rem",
  fontWeight: "700",
};

export function TestCard(props: ITestCardProps) {
  const [solveDialogOpen, setSolveDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);

  const { test } = props;
  const user = AppState.getValue("user");
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:1024px)");

  const activateTest = (testUuid: string) => {
    TestsService.activateTest(testUuid);
  };

  const closeSolveDialog = (reload: boolean) => {
    if (reload) {
      window.location.reload();
    }
    setSolveDialogOpen(false);
  };

  const openSolveDialog = () => {
    if (!test) return;
    setSolveDialogOpen(true);
  };

  const openSummaryDialog = () => {
    if (!test) return;
    setSummaryDialogOpen(true);
  };

  const closeSummaryDialog = () => {
    setSummaryDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "var(--color-dark)",
          color: "var(--color-darkWhite)",
          borderBottom: "2px solid var(--color-primary)",
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
            alignItems: "center",
            flexDirection: matches ? "row" : "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {test.active && test.solvedByLoggedUser ? (
              <>
                <Button
                  onClick={() => openSolveDialog()}
                  sx={{
                    color: "var(--color-white)",
                    background: "var(--color-blue)",
                    ":hover": {
                      color: "var(--color-white)",
                      borderColor: "var(--color-blue)",
                      background: "var(--color-blue)",
                    },
                    ":disabled": {
                      color: "var(--color-primary)",
                      background: "var(--color-secondary)",
                      opacity: "0.4",
                    },
                    ...buttonSizeSx,
                  }}
                  variant="contained"
                >
                  Popraw test
                </Button>
                <Button
                  onClick={() => openSummaryDialog()}
                  sx={{
                    color: "var(--color-white)",
                    background: "var(--color-blue)",
                    ":hover": {
                      color: "var(--color-white)",
                      borderColor: "var(--color-blue)",
                      background: "var(--color-blue)",
                    },
                    ":disabled": {
                      color: "var(--color-primary)",
                      background: "var(--color-secondary)",
                      opacity: "0.4",
                    },
                    ...buttonSizeSx,
                  }}
                  variant="contained"
                >
                  Podgląd odpowiedzi
                </Button>
              </>
            ) : null}

            {test.active && !test.solvedByLoggedUser ? (
              <Button
                onClick={() => openSolveDialog()}
                sx={{
                  color: "var(--color-white)",
                  background: "var(--color-blue)",
                  ":hover": {
                    color: "var(--color-white)",
                    borderColor: "var(--color-blue)",
                    background: "var(--color-blue)",
                  },
                  ":disabled": {
                    color: "var(--color-primary)",
                    background: "var(--color-secondary)",
                    opacity: "0.4",
                  },
                  ...buttonSizeSx,
                }}
                variant="contained"
              >
                Rozwiąż test
              </Button>
            ) : null}

            {user?.role === "ADMIN" ? (
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                {test.active ? (
                  <Tooltip title="Nie można edytować udostępnionego testu.">
                    <span>
                      <Button
                        sx={{
                          color: "var(--color-white)",
                          background: "var(--color-blue)",
                          ":hover": {
                            color: "var(--color-white)",
                            borderColor: "var(--color-blue)",
                            background: "var(--color-blue)",
                          },
                          ":disabled": {
                            color: "var(--color-primary)",
                            background: "var(--color-secondary)",
                            opacity: "0.4",
                          },
                          ...buttonSizeSx,
                        }}
                        variant="contained"
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
                    sx={{
                      color: "var(--color-white)",
                      background: "var(--color-blue)",
                      ":hover": {
                        color: "var(--color-white)",
                        borderColor: "var(--color-blue)",
                        background: "var(--color-blue)",
                      },
                      ":disabled": {
                        color: "var(--color-primary)",
                        background: "var(--color-secondary)",
                        opacity: "0.4",
                      },
                      ...buttonSizeSx,
                    }}
                    variant="contained"
                  >
                    Edytuj
                  </Button>
                )}
                {!test.active ? (
                  <Button
                    onClick={() => activateTest(test.uuid)}
                    sx={{
                      color: "var(--color-white)",
                      background: "var(--color-success)",
                      ":hover": {
                        color: "var(--color-white)",
                        borderColor: "var(--color-success)",
                        background: "var(--color-success)",
                      },
                      ...buttonSizeSx,
                    }}
                    variant="contained"
                  >
                    Udostępnij
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          <Typography
            sx={{
              width: "100%",
              padding: "0.5rem",
              textAlign: matches ? "right" : "center",

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
      {solveDialogOpen ? (
        <SolveTestDialog
          testUuid={test.uuid}
          open={solveDialogOpen}
          onClose={closeSolveDialog}
        />
      ) : null}
      {summaryDialogOpen ? (
        <SolvedTestSummaryDialog
          testUuid={test.uuid}
          open={summaryDialogOpen}
          onClose={closeSummaryDialog}
        />
      ) : null}
    </>
  );
}
