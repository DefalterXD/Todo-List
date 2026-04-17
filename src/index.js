import "./reset.css";
import "./style.css";
import { headerContainer } from "./render/headerRender.js";
import { elementDOMForAppend } from "./render/mediator.js";

elementDOMForAppend.body.prepend(headerContainer);

