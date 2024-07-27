import { action, KeyDownEvent, DialUpEvent, DialDownEvent, DialRotateEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

/**
 * An example action class that displays a count that increments by one each time the button is pressed.
 */
@action({ UUID: "com.jose-rivera.vscode.increment" })
/**
 * Listens for the {@link DialRotateEvent} event which is emitted by Stream Deck when the dial is rotated. This event provides information about the rotation direction and the number of steps rotated.
 * The `ev` object contains information about the event including any payloads and action information where applicable.
 *
 * @param ev - The {@link DialRotateEvent} object containing information about the event.
 * @returns A promise that resolves when the function is done executing.
 */
export class IncrementCounter extends SingletonAction<CounterSettings> {
	/**
	 * The {@link SingletonAction.onWillAppear} event is useful for setting the visual representation of an action when it become visible. This could be due to the Stream Deck first
	 * starting up, or the user navigating between pages / folders etc.. There is also an inverse of this event in the form of {@link streamDeck.client.onWillDisappear}. In this example,
	 * we're setting the title to the "count" that is incremented in {@link IncrementCounter.onKeyDown}.
	 */
	onWillAppear(ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
		return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`);
	}

	/**
	 * Listens for the {@link SingletonAction.onKeyDown} event which is emitted by Stream Deck when an action is pressed. Stream Deck provides various events for tracking interaction
	 * with devices including key down/up, dial rotations, and device connectivity, etc. When triggered, {@link ev} object contains information about the event including any payloads
	 * and action information where applicable. In this example, our action will display a counter that increments by one each press. We track the current count on the action's persisted
	 * settings using `setSettings` and `getSettings`.
	 */
	async onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
		// Determine the current count from the settings.
		let count = ev.payload.settings.count ?? 0;
		count++;


    console.log("Key Down");

		// Update the current count in the action's settings, and change the title.
		await ev.action.setSettings({ count });
		await ev.action.setTitle(`${count}`);
	}

	async onDialUp(ev: DialUpEvent<CounterSettings>): Promise<void> {
			let count = ev.payload.settings.count ?? 0;
			count++;


      console.log("Dial Up");

			await ev.action.setSettings({ count });
			await ev.action.setTitle(`${count}`);
	}

	async onDialDown(ev: DialDownEvent<CounterSettings>): Promise<void> {
			let count = ev.payload.settings.count ?? 0;
			count--;
      console.log("Dial Down");

			await ev.action.setSettings({ count });
			await ev.action.setTitle(`${count}`);
	}

  async onDialRotate(ev: DialRotateEvent<CounterSettings>): Promise<void> {
    let count = ev.payload.settings.count ?? 0;
    console.log("Count " + count);
    console.log("Ticks " + ev.payload.ticks);
    console.log("Dial Rotate");
  }
}

/**
 * Settings for {@link IncrementCounter}.
 */
type CounterSettings = {
	count: number;
};
