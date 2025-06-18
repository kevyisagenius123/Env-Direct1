# IDE Setup Instructions for Environment Direct Backend

This document provides instructions for setting up your IDE to properly recognize the Spring Boot dependencies in this project.

## IntelliJ IDEA

Hi Junie! Let's get those Java errors fixed in IntelliJ.

1.  **Reload Maven Project:**
    *   In IntelliJ, look for the **"Maven"** tool window. It's usually a tab on the **right sidebar** of the IntelliJ window. If you don't see it, you can open it by going to "View" (top menu) -> "Tool Windows" -> "Maven".
    *   Once the Maven tool window is open, you'll see your `backend` project listed. Find and click the **"Reload All Maven Projects"** button. It looks like two blue arrows forming a circle (🔄).
    *   *Wait for IntelliJ to finish processing. You might see a progress bar at the bottom.*

2.  **Invalidate Caches & Restart (This is often the magic fix!):**
    *   Go to the **"File"** menu (it's in the top-left corner of the IntelliJ window).
    *   Select **"Invalidate Caches..."** (In newer versions, it might directly say "Invalidate Caches / Restart...". If you see "Invalidate Caches...", click it, and then in the dialog that pops up, make sure to check options like "Clear file system cache and Local History" and then click **"Invalidate and Restart"**). If you see "Invalidate Caches / Restart...", click that, and then in the dialog, choose **"Invalidate and Restart"**.
    *   *IntelliJ will close, do some cleanup of its internal caches, and then restart. This process might take a few minutes, so please be patient.*

3.  **Check Project Structure (After IntelliJ restarts):**
    *   Once IntelliJ is back up, look at the **"Project"** tool window (usually on the **left sidebar**). Find your `backend` module (it might be named `backend` or have your main project's name).
    *   Right-click on the `backend` module.
    *   From the context menu, select **"Open Module Settings."** (It might also be under "Project Structure..." depending on your IntelliJ version and setup).
    *   In the "Project Structure" window that appears, click on **"Modules"** in the left-hand panel.
    *   Make sure your `backend` module is selected in the list in the middle panel.
    *   Now, look at the **"Sources"** tab on the right side of this window.
        *   The folder `src/main/java` should be marked with a **blue folder icon** and listed under "Source Folders." If it's not blue or not listed as a source folder, select `src/main/java` in the directory tree in the middle of this "Sources" tab, and then click the **"Sources"** button (it's a blue folder icon or says "Mark as: Sources") at the top of that directory tree panel.
        *   Similarly, the folder `src/main/resources` should be marked as a **"Resources"** folder (often a slightly different blue folder icon with some markings). If not, select it and mark it as "Resources."
    *   While you're in the "Project Structure" window, also check that the **"Project SDK"** is correctly set. You can find this under "Project Settings" -> "Project" on the left. It should be set to **Java 17** (or a compatible Java SDK version 17 or higher that you have installed). Your `pom.xml` specifies Java 17.

## Eclipse (with the m2e plugin for Maven)

1. **Update Maven Project:**
   * In the "Package Explorer" or "Project Explorer" (usually on the left), find your `backend` project.
   * Right-click on it.
   * Go to "Maven" -> "Update Project...".
   * In the dialog, make sure your `backend` project is checked.
   * **Crucially, check the box that says "Force Update of Snapshots/Releases."**
   * Click "OK."

2. **Clean Project:**
   * With the `backend` project selected, go to the "Project" menu at the top.
   * Select "Clean...".
   * Make sure your `backend` project is selected in the dialog and click "Clean."

3. **Check Java Build Path (If errors persist):**
   * Right-click on the `backend` project.
   * Select "Properties."
   * Navigate to "Java Build Path" (on the left).
   * Go to the "Source" tab. Check that `backend/src/main/java` is listed as a source folder.
   * Go to the "Libraries" tab. You should see "Maven Dependencies" listed. This is where all your project's libraries (like Spring Boot) should appear.

## VS Code (with the Extension Pack for Java)

1. **Reload Window:**
   * Open the Command Palette: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on a Mac).
   * Type `Developer: Reload Window` and select that command from the list.

2. **Clean Java Language Server Workspace:**
   * Open the Command Palette again (`Ctrl+Shift+P` or `Cmd+Shift+P`).
   * Type `Java: Clean Java Language Server Workspace` and select it.
   * VS Code will ask for confirmation. Proceed. This will rebuild the Java language server's understanding of your project. It might take a moment.

3. **Verify Maven Project Recognition:**
   * Make sure VS Code sees your `backend` folder as a Maven project. You should have a "Maven" view available in the Explorer sidebar (usually on the left, with an "M" icon). If it's not there, or doesn't show your project, there might be an issue with how the folder was opened in VS Code.

## After Following These Steps

**After you've completed these three steps, Junie:**

1.  **Wait a Moment:** Give IntelliJ a minute or two to finish any background tasks (like re-indexing your project files and downloaded libraries). You can usually see its progress in the status bar at the bottom of the IntelliJ window.
2.  **Check for Errors:** Open the `ChatController.java` file again (it's at `backend/src/main/java/com/environmentdirect/controller/ChatController.java`) and also the `SimpleChatbotService.java` file.
3.  **Verify:** The red squiggly lines indicating errors for imports like `org.springframework...` and annotations like `@RestController`, `@Service`, etc., should now be **gone**. IntelliJ should now recognize all the Spring Boot classes because it has correctly processed your `pom.xml` and set up the project.

Junie, please try these steps in order. The "Invalidate Caches / Restart" is a very common solution for these kinds of problems in IntelliJ. Let us know if this fixes the errors!
