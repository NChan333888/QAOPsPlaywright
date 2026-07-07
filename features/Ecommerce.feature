Feature: Ecommerce validations
  @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "abcefg@yopmail.com" and "Abcefg123$$$"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify the order is present in the OrderHistory

  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
  Examples:
  | username           | password       |  
  | abcefg@yopmail.com | Abcefg123$$$  |
  | abcefg@yopmail.com | Abcefg123$$$   |


