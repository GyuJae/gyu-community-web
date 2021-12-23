import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { authStateAtom } from "./atoms/auth.atom";
import { darkModeState } from "./atoms/darkMode.atom";
import Header from "./components/Header";
import Auth from "./screens/Auth";
import CreateAccount from "./screens/CreateAccount";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import PostDetail from "./screens/PostDetail";
import Search from "./screens/Search";
import UserDetail from "./screens/UserDetail";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.color.background};
  color:${(props) => props.theme.color.text}
}
a {
  text-decoration:none;
}
`;

function App() {
  const darkMode = useRecoilValue(darkModeState);
  const authState = useRecoilValue(authStateAtom);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <AnimateSharedLayout>
          <Header />
          <Routes>
            <Route path="/*" element={<Home />} />
            {!authState.status ? (
              <>
                <Route path="auth" element={<Auth />} />
                <Route path="create-account" element={<CreateAccount />} />
              </>
            ) : (
              <>
                <Route path="create-post" element={<Home />} />
              </>
            )}
            <Route path="search" element={<Search />} />
            <Route path="user/:userId" element={<UserDetail />} />
            <Route path="post/:postId" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimateSharedLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
