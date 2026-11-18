# Lista de Tarefas — React Native (Expo)

Atividade acadêmica: aplicativo mobile de lista de tarefas com tema escuro e detalhes em azul.

## Funcionalidades
- Adicionar tarefas (texto vazio é ignorado)
- Listar tarefas cadastradas
- Marcar tarefa como concluída (texto riscado)
- Contadores de tarefas **pendentes** e **concluídas**

## Como executar
Pré-requisitos: [Node.js](https://nodejs.org) 20+ e o app **Expo Go** no celular (SDK 57).

```bash
npm install --legacy-peer-deps
npx expo start        # escaneie o QR code com o Expo Go
npx expo start --web  # ou abra no navegador (http://localhost:8081)
```

## Estrutura
```
src/
├── App.js                  # ponto de entrada da interface, carrega TaskScreen
├── components/
│   ├── TaskList.js         # exibe a lista de tarefas
│   └── TaskItem.js         # exibe uma tarefa e permite concluí-la
├── screens/
│   └── TaskScreen.js       # lógica principal e gerenciamento de estado
└── services/
    └── taskService.js      # reducer, ações, criação de tarefa e contagem
```

## Conceitos de React aplicados
| Recurso | Onde | Para quê |
|---|---|---|
| `useReducer` | `screens/TaskScreen.js` | estado da lista de tarefas |
| `useState` | `screens/TaskScreen.js` | texto digitado no campo |
| `useCallback` | `screens/TaskScreen.js` (`handleToggleTask`, `handleAddTask`) | manter referência estável das funções passadas por props |
| `useMemo` | `screens/TaskScreen.js` | calcular pendentes/concluídas só quando a lista muda |
| `React.memo` | `components/TaskItem.js`, `components/TaskList.js` | evitar renderizações desnecessárias |

### Como verificar a memoização
`TaskItem` escreve `Renderizou TaskItem: <título>` no console a cada renderização.
Ao concluir uma tarefa, **apenas** o log dessa tarefa aparece; digitar no campo de texto não renderiza nenhum item.
Isso funciona porque o reducer (`taskService.js`) devolve a **mesma referência** para tarefas não alteradas.
(No modo de desenvolvimento web o `StrictMode` pode duplicar logs.)

## Separação de responsabilidades
- **Lógica:** `services/taskService.js` (sem UI) e `screens/TaskScreen.js` (estado e handlers)
- **Interface:** `components/` (apenas exibição, recebem dados e callbacks por props)
