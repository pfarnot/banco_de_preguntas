import { Dialog } from "quasar";

class _AppDialogService {
  async dialogtest() {
    // (un)comment one or move of the tests below
    this.alert("Test Alert", "All is good, no wait");
   
    await this.alert("Test Alert", "All is good,  wait for dismiss");
  
  }
  async dialog(opts = {}) {
    return new Promise(resolve => {
      if (opts.prompt === true) opts.prompt = { model: "", type: "text" };
      Dialog.create({
        title: opts.title || "",
        message: opts.msg || "",
        cancel: opts.cancel == null ? false : opts.cancel,
        persistent: opts.persist == null ? false : opts.persist,
        prompt: opts.prompt,
        ok: {
          label: opts.ok || "ok"
        }
      })
        .onOk((res) => resolve(opts.confirm ? true : res || ""))
        .onCancel(() => resolve(false));
    });
  }

  async confirm(title, msg, label) {
    return this.dialog({
      title: title,
      msg: msg,
      confirm: true,
      cancel: true,
      persist: true,
      ok: label
    });
  }
  async alert(title, msg) {
    return this.dialog({ title: title, msg: msg });
  }
  async prompt(title, msg, prompt) {
    return this.dialog({
      title: title,
      msg: msg,
      persist: true,
      prompt: prompt || true
    });
  }
}

export default new _AppDialogService();