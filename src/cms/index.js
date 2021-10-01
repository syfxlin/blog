import CMS from "netlify-cms-app";
import { repoEditor } from "./components/repo";
import { postEditor } from "./components/post";
import { messageEditor } from "./components/message";

CMS.registerEditorComponent(repoEditor);
CMS.registerEditorComponent(postEditor);
CMS.registerEditorComponent(messageEditor);
