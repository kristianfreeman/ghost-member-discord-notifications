A simple webhook built with Cloudflare Workers for taking new member notifications from Ghost and posting them into a Discord server.

For more instructions on how to use this in practice, check out the associated blog post on bytesized.xyz.

You'll need a Cloudflare Workers account (free plan is OK) and our command-line tool [Wrangler](https://github.com/cloudflare/wrangler) installed and configured on your machine.

_If you aren't familiar with Cloudflare Workers, it's worthwhile to spend 20-30 minutes diving through my Egghead.io course. I'll teach you how to set up your Cloudflare account, sign up for Workers, and deploy your first project with Wrangler, our command-line tool. [Watch it for free on Egghead!](https://egghead.io/playlists/introduction-to-cloudflare-workers-5aa3?af=a54gwi)_

## Configuration

First, clone the project locally:

```sh
$ git clone git@github.com:signalnerve/ghost-member-discord-notifications.git
```

Next, update the `account_id` field in `wrangler.toml` with your account ID. To find that value, you can use wrangler whoami, or [follow the instructions for finding it in our Quick Start](https://developers.cloudflare.com/workers/learning/getting-started#7-configure-your-project-for-deployment).

After publishing your project, you'll need to set a number of _secrets_ using `wrangler secret`, in the format `wrangler secret put key` (using the interactive prompt, pass the `value` as specified below):

| key         | value                                                     |
| ----------- | --------------------------------------------------------- |
| DISCORD_URL | An authenticated Discord webhook URL (see "Webhook URL" ) |
| PASSWORD    | A unique string password (see "Password")                 |

### Webhook URL

The `DISCORD_URL` value you pass in as a secret should be an authenticated Discord URL as created in the "Integrations -> Webhooks" UI found in your Discord channel settings. For a guide on creating this, see the associated blog post.

### Password

A unique (and secret) password based on a string. This provides simple validation that only your known webhook can make requests to this endpoint. This is sent as a query parameter from Ghost to your serverless URL. (BTW this isn't perfect security, sorry, but it's a notification webhook... chill)
