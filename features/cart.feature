Feature: Add products to the shopping cart

  Background:
    Given the shopper is on the Toolshop home page

  Scenario: A shopper adds a product to the cart
    When the shopper opens the "Combination Pliers" product page
    And the shopper adds the product to the cart
    Then the cart shows "Combination Pliers"
    And the cart shows a quantity of 1

  Scenario: A shopper chooses a quantity before adding a product
    When the shopper opens the "Combination Pliers" product page
    And the shopper increases the quantity to 3
    And the shopper adds the product to the cart
    Then the cart shows a quantity of 3

  Scenario: A shopper cannot choose a quantity below 1
    When the shopper opens the "Combination Pliers" product page
    And the shopper tries to lower the quantity below 1
    Then the quantity stays at 1
