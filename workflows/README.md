# Contact form workflow (n8n)

`contact-form.n8n.json` receives the site's contact form, emails you the details, and emails the visitor an acknowledgement. Both emails use the n8n **Gmail** node.

```
Webhook (POST /contact-form)
  -> Validate and build emails (Code)
  -> valid?  yes -> Gmail: email me the details -> Gmail: acknowledge visitor -> Respond 200 {ok:true}
             no  -> Respond 400 {ok:false}
```

Already imported into the n8n instance as "NiffyJade portfolio: contact form to emails" (inactive). Re-import this file to reset it.

## Set up

1. **Your address:** open the **Validate and build emails** node and set `OWNER_EMAIL` (where enquiries arrive; usually the Gmail account you connect).
2. **Gmail credential:** open **Email me the details**, click *Credential to connect with* > *Create new credential* > **Gmail OAuth2 API**, and sign in with Google. Select the same credential on **Email visitor acknowledgement**.
   - Self-hosted n8n needs a Google Cloud OAuth client first: create an OAuth client ID (Web application), enable the **Gmail API**, add n8n's OAuth redirect URL (shown in the credential dialog, e.g. `https://niffyjade-n8n-free.hf.space/rest/oauth2-credential/callback`), then paste the Client ID and Secret into the credential. While the Google app is in *Testing*, add your Gmail as a test user (test-mode tokens expire after 7 days; publish the app to avoid that).
   - Both emails are sent from the connected Gmail account.
3. **Test:** click **Execute workflow**, then post to the *test* URL:
   ```bash
   curl -X POST "https://niffyjade-n8n-free.hf.space/webhook-test/contact-form" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Person","email":"you+test@example.com","details":"I want to automate lead follow-up."}'
   ```
   Expect `{"ok":true}`, one email to you (Reply-To is the visitor) and one acknowledgement to the visitor.
4. **Go live:** toggle the workflow **Active**. The site posts to `https://niffyjade-n8n-free.hf.space/webhook/contact-form`.

## Notes

- **CORS:** the webhook allows all origins (`*`). After launch, set *Allowed Origins* on the Webhook node to your real domain.
- **Safety:** inputs are trimmed and length-capped, line breaks are stripped from name and email, and visitor text is HTML-escaped before it goes into your inbox.
- **Abuse:** anyone can trigger the acknowledgement email to an address they type. If spam appears, add a honeypot field or a rate limit.
- **Gmail limits:** a personal Gmail account can send roughly 500 messages a day; plenty for a contact form.
- **Free Hugging Face Space:** these sleep when idle, so the first submission after a quiet spell can be slow or fail. A free uptime ping keeps it awake.
- **Failures:** if a Gmail node fails, n8n returns an error and the site shows its "Couldn't send" message.
