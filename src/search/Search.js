import React, { useState } from "react";
import "./Search.css";
import axios from "axios";
import Card from "../card/Card.js";
import { Dropdown, Form, Container, Row, Col } from "react-bootstrap";
const SearchPage = () => {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("select");

  const fetchRepositories = async (value) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${search}&sort=${value}`
      );
      const repositoriesData = response?.data?.items;
      setResult(repositoriesData);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleSortByChange = (eventKey) => {
    if (search === "") {
      alert("before sort enter your search key");
    } else {
      console.log(eventKey, "eventKey");
      fetchRepositories(eventKey);
      setSortBy(eventKey);
    }
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  const debounceOnChange = React.useCallback(debounce(onChange, 400), []);

  const handleData = (e) => {
    debounceOnChange(e.target.value);
    setSearch(e.target.value);
  };

  function onChange(value) {
    fetch(`https://api.github.com/search/repositories?q=${value}`)
      .then((res) => res.json())
      .then((res) => setResult(res?.items));
  }

  console.log(sortBy, "sortBy");
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col>
            <Form autoComplete="off">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Search Here"
                  onChange={(e) => handleData(e)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center gap-3 justify-content-center">
              <Dropdown onSelect={handleSortByChange}>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  {sortBy}{" "}
                  {/* {dayNo === 'all' ? 'All Time' : `Last ${dayNo} days`} */}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="stars">Stars</Dropdown.Item>
                  <Dropdown.Item eventKey="name">name</Dropdown.Item>
                  <Dropdown.Item eventKey="watchers count">
                    watchers count
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="score">score</Dropdown.Item>
                  <Dropdown.Item eventKey="created_at">
                    created_at
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="updated_at">
                    updated_at
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          {result &&
            result.map((item) => (
              <Col lg={4} sm={6} key={item?.id}>
                <Card item={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchPage;
