import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { setupRenderingTest } from "discourse/tests/helpers/component-test";
import { query } from "discourse/tests/helpers/qunit-helpers";
import fabricators from "discourse/plugins/chat/discourse/lib/fabricators";

module("Discourse Chat | Unit | Helpers | format-chat-date", function (hooks) {
  setupRenderingTest(hooks);

  test("link to chat message", async function (assert) {
    const channel = fabricators.channel();
    this.message = fabricators.message({ channel });

    await render(hbs`{{format-chat-date this.message}}`);

    assert.equal(
      query(".chat-time").getAttribute("href"),
      `/chat/c/-/${channel.id}/${this.message.id}`
    );
  });

  test("link to chat message thread", async function (assert) {
    const channel = fabricators.channel();
    const thread = fabricators.thread();
    this.message = fabricators.message({ channel, thread });

    await render(
      hbs`{{format-chat-date this.message (hash threadContext=true)}}`
    );

    assert.equal(
      query(".chat-time").getAttribute("href"),
      `/chat/c/-/${channel.id}/t/${thread.id}/${this.message.id}`
    );
  });
});
