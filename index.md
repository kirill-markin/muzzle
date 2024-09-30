---
layout: main
title: {{ site.data.personal_info.name }} | {{ site.data.personal_info.job_title }} | {{ site.data.personal_info.secondary_title }} | {{ site.data.personal_info.tertiary_title }} | contacts, media
description: Contacts and related URLs to {{ site.data.personal_info.name }}. Social media profiles, instagram, Linkedin, email and phone. {{ site.data.personal_info.secondary_title }} | {{ site.data.personal_info.tertiary_title }}
lang: en
lang-ref: contacts-media
---
<div id="main-page-content">
  <div class="left-column">
    <h2> {{ site.data.personal_info.name }} </h2>

{{ site.data.personal_info.job_title }} <br>
{{ site.data.personal_info.secondary_title }} <br>
{{ site.data.personal_info.tertiary_title }}

<h2>Contact Information</h2>

<div id="social-links-ul">
<ul>
{% for link in site.data.social_links %}
<li>{{ link.name }}: <a href="{{ link.url }}">{{ link.username }}</a></li>
{% endfor %}
</ul>
</div>

</div>
<div class="right-column">

<h2>Professional Roles</h2>

<div id="professional-roles-ul">
<ul>
{% for role in site.data.professional_roles %}
<li><a href="{{ role.url }}">{{ role.title }}</a></li>
{% endfor %}
</ul>
</div>


<h2>Media Mentions and Articles</h2>

{% for mention in site.data.media_mentions %}
{% if mention.language == 'en' %}
### {{ mention.title }}
- Publisher: {{ mention.publisher }}
- Date: {{ mention.date }}
- [Read more]({{ mention.url }})
{% if mention.event %}
- Event: [{{ mention.event }}]({{ mention.event_url }})
{% endif %}
{% if mention.type %}
- Type: {{ mention.type }}
{% endif %}

{% endif %}
{% endfor %}

<h2>Other Profiles and URLs</h2>

{% for url in site.data.other_urls %}
- {{ url.name }}: [{{ url.username }}]({{ url.url }})
{% endfor %}
</div>
</div>