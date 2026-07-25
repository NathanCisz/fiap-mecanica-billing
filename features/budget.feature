Feature: Gerenciamento de Orçamentos
  Como um sistema de oficina mecânica
  Quero gerenciar orçamentos de ordens de serviço
  Para controlar os custos e aprovações

  Scenario: Criar um orçamento com sucesso
    Given que tenho uma ordem de serviço com id "order-123"
    And os itens do orçamento são:
      | description   | quantity | unitPrice | totalPrice |
      | Troca de óleo | 1        | 50        | 50         |
    When eu criar o orçamento
    Then o orçamento deve ser criado com status "PENDING"
    And o valor total deve ser 50

  Scenario: Aprovar um orçamento pendente
    Given que existe um orçamento com status "PENDING"
    When eu aprovar o orçamento
    Then o status do orçamento deve ser "APPROVED"

  Scenario: Rejeitar um orçamento pendente
    Given que existe um orçamento com status "PENDING"
    When eu rejeitar o orçamento
    Then o status do orçamento deve ser "REJECTED"