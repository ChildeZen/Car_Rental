import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import { isCarAvailable } from "../utils/bookingUtils";

const CarListing = () => {
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedDates, setSelectedDates] = useState([]);

  const handleFilterBrandChange = (e) => {
    setFilterBrand(e.target.value);
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
  };

  // Helper function to get all dates between two dates
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const uniqueBrands = [...new Set(carData.map(car => car.brand))];
  const uniqueCategories = [...new Set(carData.map(car => car.category))];

  const filteredCars = carData.filter(car => {
    const brandMatch = filterBrand === "all" || car.brand === filterBrand;
    const categoryMatch = filterCategory === "all" || car.category === filterCategory;
    const availabilityMatch = selectedDates.length === 0 || isCarAvailable(car.id, selectedDates);
    return brandMatch && categoryMatch && availabilityMatch;
  });

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Filter by Brand
                </span>

                <select value={filterBrand} onChange={handleFilterBrandChange}>
                  <option value="all">All Brands</option>
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>

                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Filter by Category
                </span>

                <select value={filterCategory} onChange={handleFilterCategoryChange}>
                  <option value="all">All Categories</option>
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* <span className=" d-flex align-items-center gap-2">
                  <i className="ri-calendar-line"></i> Select Dates
                </span>

                <div className="d-flex gap-2">
                  <input
                    type="date"
                    onChange={(e) => handleDateSelect([e.target.value])}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    onChange={(e) => {
                      const fromDate = document.querySelector('input[type="date"]:first-of-type').value;
                      if (fromDate) {
                        const dates = getDatesBetween(fromDate, e.target.value);
                        handleDateSelect(dates);
                      }
                    }}
                    min={new Date().toISOString().split('T')[0]}
                  /> */}
                {/* </div> */}
              </div>
            </Col>

            {filteredCars.length > 0 ? (
              filteredCars.map((item, index) => (
                <CarItem
                  item={item}
                  key={item.id}
                  index={index}
                  selectedDates={selectedDates}
                  isAvailable={selectedDates.length === 0 || isCarAvailable(item.id, selectedDates)}
                />
              ))
            ) : (
              <Col lg="12">
                <div className="text-center py-5">
                  <h4>No cars available for selected dates</h4>
                  <p>Please try different dates or remove the date filter to see all available cars.</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
