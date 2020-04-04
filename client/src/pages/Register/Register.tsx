import React, { useState } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, Container } from "@material-ui/core";
import { PageProgress } from "../../components/PageProgress";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import { Page3 } from "./Page3";
import { usePageControl } from "../../hooks/usePageControl";

//have preferences on seperate page
//we get route props because this component is passed
// as a prop to the react-router-dom <Route/> component

const pages: JSX.Element[] = [<Page1 />, <Page2 />, <Page3 />];

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [register] = useRegisterMutation();
  const { positionCSS, showNext, showPrevious, showSubmit } = usePageControl(
    currentPage,
    pages.length
  );

  const submitUser = async ({ email, password, firstName, lastName, age }) => {
    const response = await register({
      variables: {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
      },
    });
    console.log(response);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        age: "",
        exerciseTypes: [],
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await submitUser(values);
        setSubmitting(false);
        history.push("/");
      }}
    >
      {({ values, isSubmitting }) => (
        <Container maxWidth="sm">
          <Form>
            <div className="register-form-container">
              <PageProgress pageNum={currentPage} pageCount={pages.length} />
              <div className="register-form">
                {pages[currentPage]}
                <div
                  style={{
                    display: "flex",
                    justifyContent: positionCSS,
                    width: "100%",
                  }}
                >
                  {showPrevious && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setCurrentPage((page) => (page -= 1))}
                    >
                      Prev Page
                    </Button>
                  )}

                  {showNext && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setCurrentPage((page) => (page += 1))}
                    >
                      next Page
                    </Button>
                  )}
                </div>
                {showSubmit && (
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Register
                  </Button>
                )}
              </div>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        </Container>
      )}
    </Formik>
  );
};
