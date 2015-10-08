import vibe.http.fileserver;
import vibe.http.router;
import vibe.http.server;

shared static this()
{
	auto router = new URLRouter;
	router.get("/", staticTemplate!"home.dt");
	router.get("/docs", staticTemplate!"docs.dt");
	router.get("/tutorials", staticTemplate!"tutorials.dt");
	router.get("/download", staticTemplate!"download.dt");
	router.get("*", serveStaticFiles("public"));
	router.get("*", serveStaticFiles("../public"));

	auto settings = new HTTPServerSettings;
	settings.port = 8080;
	listenHTTP(settings, router);
}
