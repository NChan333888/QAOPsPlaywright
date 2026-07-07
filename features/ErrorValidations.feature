Feature: Ecommerce validations
  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

  Examples:
  | username           | password       |  
  | abcefg@yopmail.com | Abcefg123$$$  |
  | abcefg@yopmail.com | Abcefg123$$$   |

  



