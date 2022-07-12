import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab/";
import FoodleAPI from "../../utils/api";
import Loader from "../../components/Loader";

const ChangeLog = () => {
  const [values, setValues] = useState({ loading: true, changes: [] });

  useEffect(() => {
    const api = new FoodleAPI();
    api
      .getChangelog()
      .then((result) => {
        console.log(result);
        setValues((state) => ({
          ...state,
          changes: result.data || [],
          loading: false,
        }));
      })
      .catch((err) => console.error(err));

    return () => {};
  }, []);

  if (values.loading) return <Loader />;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ pt: 3 }} textAlign="center">
        Changelog
      </Typography>
      <Timeline position="right">
        {values.changes.map(({ version, changes }, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary">
              {version}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {index !== values.changes.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ flex: 4 }}>
              <ul>
                {changes.map(({ text, type }, index) => (
                  <li
                    style={{
                      fontWeight: type === "bug-fix" ? 600 : "initial",
                    }}
                    key={index}
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};

export default ChangeLog;
