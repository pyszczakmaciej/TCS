import { Button, List, TextField, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestsService from "../../backend/tests/Tests.service";
import { TestView } from "../../backend/tests/models/test-view.interface";
import "./Tests.page.css";
import { TestCard } from "./components/test-card/TestCard.component";
export interface ITestsPageProps {}

const textFieldSx = {
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "var(--color-white)",
    border: "1px solid",
    borderColor: "var(--color-secondary)",
    color: "var(--color-dark)",

    "&:hover": {
      backgroundColor: "var(--color-white)",
      color: "var(--color-dark)",
    },
    "&.Mui-focused": {
      backgroundColor: "var(--color-white)",

      borderColor: "var(--color-primary)",
    },
  },
};

export function TestsPage(props: ITestsPageProps) {
  const [testName, setTestName] = useState("");
  const [tests, setTests] = useState<TestView[]>([]);

  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    TestsService.fetchTests().then((res) => {
      console.log(res);
      setTests(res.content);
    });
  }, []);

  const createTest = async () => {
    if (!testName) return;
    await TestsService.createTest(testName).then((res) => {
      navigate(`${res}`);
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        background: "var(--color-dark)",
      }}
      {...props}
    >
      <div className="tests-page__header">
        <div className="tests-page__header-content">
          <TextField
            label="Nazwa testu"
            variant="filled"
            sx={{ width: matches ? "100%" : "70%", ...textFieldSx }}
            placeholder="Nazwa testu"
            onChange={(e) => setTestName(e.target.value)}
            required
          />

          <Button
            sx={{
              width: matches ? "100%" : "30%",
              background: "var(--color-blue)",
              color: "var(--color-white)",
              ":hover": {
                background: "var(--color-blue)",
                color: "var(--color-white)",
              },
            }}
            variant="contained"
            size="large"
            onClick={createTest}
          >
            Stwórz test
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowY: "scroll",
          }}
        >
          {tests.map((test, index) => {
            return <TestCard key={index} test={test} />;
          })}
        </List>
      </div>
    </div>
  );
}
