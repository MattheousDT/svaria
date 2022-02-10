---
id: alert
pretitle: 구성 요소들
title: 경보
description: 알림은 사용자의 작업을 방해하지 않고 사용자의 주의를 끄는 방식으로 짧고 중요한 메시지를 표시하는 요소입니다. 동적으로 렌더링되는 알림은 대부분의 화면 판독기에 의해 자동으로 알림되며 일부 운영 체제에서는 알림 사운드를 트리거할 수 있습니다. 이때 화면 판독기는 페이지 로드가 완료되기 전에 페이지에 있는 알림을 사용자에게 알려주지 않습니다.
slug: /components/alert
aria: https://www.w3.org/TR/wai-aria-practices-1.1/#alert
github: /
repl: /
---

<script>
  import AlertExample from "$examples/components/alert.example.svelte";
  import Example from "$site/components/example.svelte";
</script>

## 예

<Example value={66}>

<span slot="preview">
  <AlertExample />
</span>

```svelte
<script>
  import { Alert } from "svaria";

  let visible = false;
</script>

<button on:click={() => (visible = !visible)}>
  Toggle alert
</button>

{#if visible}
  <Alert let:props>
    <h6 {...props}>
      Hej, hello, ciao, こんにちは, 안녕
    </h6>
  </Alert>
{/if}
```

</Example>

## 슬롯 특성

| 이름    | 유형     | 필수의 | 묘사                                             |
| ------- | -------- | ------ | ------------------------------------------------ |
| `props` | `object` | `true` | 하위 구성요소에 적용할 관련 특성을 포함하는 객체 |
