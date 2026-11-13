import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./theme/ThemeContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
